pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

// import './Archaeologists.sol';

/** @title Registry. */
contract Registry {
  address public creator;
  mapping (address => bool) public isDelegate;

  // Archaeologists archaeologists
  uint public archaeologistsRegistered = 0;
  address[] public archaeologists;
  mapping (address => bool) public isArchaeologist;

  uint public identificationsCreated = 0;
  mapping (uint => Identification) public identificationData;

  uint public attributionsCreated = 0;
  mapping (uint => Attribution) public attributionData;

  uint public locationsCreated = 0;
  mapping (uint => Location) public locationData;

  uint public artifactsRegistered = 0;
  uint[4][] public artifacts;
  mapping (uint => Artifact) public artifactData;

  /** @dev Artifact details of the artifact being added.
    * @param timestamp Client unix time of verification.
    * @TBC
    */
  struct Artifact {
    uint uid;
    Identification identification;
    Attribution attribution;
    Location location;
  }

  /** @dev Identification details of the artifact being added.
    * @param timestamp Client unix time of verification.
    * @TBC
    */
  struct Identification {
    uint blockTimeModified; // block.timestamp
    uint dateModified; // unix
    string doi;
    string rfid;
    string provenance;
    address wallet;
  }

  /** @dev Attribution supports the provenance of the artifact.
    * @param dateFound Date in unix time that the artifact was found.
    * @param archaeologist Address of the archaeologist registering the artifact
    * @TBC
    */
  struct Attribution {
    uint dateFound;
    address archaeologist;
    address governmentVerifier;
    address owner;
  }

  /** @dev Location details the location of the artifact.
    * @param holder Address of the identity currently holding the artifact.
    * @TBC
    */
  struct Location {
    address holder;
    string currentLatitude;
    string currentLongitude;
    string transitStatus;
  }

  constructor(/* address _delegate*/) public {
    creator = msg.sender;
    isDelegate[msg.sender] = true;
  }

  modifier onlyCreator {
    require(msg.sender == creator);
    _;
  }

  modifier onlyAuthorized(address _address) {
    require(isDelegate[_address] == true);
    _;
  }

  modifier onlyArchaeologists(address _address) {
		require(isArchaeologist[_address] == true);
		_;
	}

  // view functions promise not to modify the state
  // pure functions promise not to read from or modify the state

  // external: visible to other contracts and cannot be called internally
  function addDelegate(
    address _address
  ) external onlyAuthorized(msg.sender) returns (bool) {
    isDelegate[_address] = true;
    return isDelegate[_address];
  }

  function addArchaeologist(
    address _address
  ) external onlyAuthorized(msg.sender) returns (uint) {
    archaeologists.push(_address);
    isArchaeologist[_address] = true;
    return archaeologistsRegistered++;
  }

  function createIdentification(
    uint dateModified,
    string doi,
    string rfid,
    string provenance,
    address wallet
  ) external onlyArchaeologists(msg.sender) returns (uint) {
    uint id = identificationsCreated++;
    identificationData[id] = Identification({
      blockTimeModified: block.timestamp,
      dateModified: dateModified,
      doi: doi,
      rfid: rfid,
      provenance: provenance,
      wallet: wallet
    });
    return id;
  }

  function createAttribution(
    uint dateFound,
    address governmentVerifier,
    address owner
  ) external onlyArchaeologists(msg.sender) returns (uint) {
    uint id = attributionsCreated++;
    attributionData[id] = Attribution({
      dateFound: dateFound,
      archaeologist: msg.sender,
      governmentVerifier: governmentVerifier,
      owner: owner
    });
    return id;
  }

  function createLocation(
    string currentLatitude,
    string currentLongitude,
    string transitStatus
  ) external onlyArchaeologists(msg.sender) returns (uint) {
    uint id = locationsCreated++;
    locationData[id] = Location({
      holder: msg.sender,
      currentLatitude: currentLatitude,
      currentLongitude: currentLongitude,
      transitStatus: transitStatus
    });
    return id;
  }

  function addArtifact(
    uint identificationId,
    uint attributionId,
    uint locationId
  ) external onlyArchaeologists(msg.sender) returns (uint) {
    uint artifactId = artifactsRegistered++;
    artifactData[artifactId] = Artifact({
      uid: artifactId,
      identification: identificationData[identificationId],
      attribution: attributionData[attributionId],
      location: locationData[locationId]
    });
    artifacts.push([artifactId, identificationId, attributionId, locationId]);
    return artifactId;
  }

  function updateArtifactLocation(
    uint artifactId,
    uint clientTimestamp,
    string provenance,
    address holder,
    string lat,
    string lng,
    string status
  ) external returns (bool) {
    require(artifactData[artifactId].attribution.owner == msg.sender);
    uint locationId = artifacts[artifactId][3];
    locationData[locationId] = Location({
      holder: holder,
      currentLatitude: lat,
      currentLongitude: lng,
      transitStatus: status
    });
    artifactData[artifactId].location = locationData[locationId];
    updateArtifact(artifactId, clientTimestamp, provenance);
    return true;
  }

  // external view: promises not to modify state
  function getArchaeologists() external view returns (address[]) {
    return archaeologists;
  }

  function getArchaeologistById(uint id) external view returns (address) {
    return archaeologists[id];
  }

  function getIdentificationById(uint id) external view returns (
    uint,
    uint,
    string,
    string,
    string,
    address
  ) {
    return (
      identificationData[id].blockTimeModified,
      identificationData[id].dateModified,
      identificationData[id].doi,
      identificationData[id].rfid,
      identificationData[id].provenance,
      identificationData[id].wallet
    );
  }

  function getAttributionById(uint id) external view returns (
    uint,
    address,
    address,
    address
  ) {
    return (
      attributionData[id].dateFound,
      attributionData[id].archaeologist,
      attributionData[id].governmentVerifier,
      attributionData[id].owner
    );
  }

  function getLocationById(uint id) external view returns (
    address,
    string,
    string,
    string
  ) {
    return (
      locationData[id].holder,
      locationData[id].currentLatitude,
      locationData[id].currentLongitude,
      locationData[id].transitStatus
    );
  }

  function getArtifacts() external view returns (uint[4][]) {
    return artifacts;
  }

  function getArtifactById(uint id) external view returns (uint[4]) {
    return artifacts[id];
  }

  // external pure: promises not to modify or read from state

  // public: visisble to this contract, contracts derived from this contract, and any other contracts
  function () public payable {}

  // internal: visible to this contract and derived contracts

  // private: visible to this contract only
  function updateArtifact(
    uint artifactId, uint clientTimestamp, string provenance
  ) private returns (bool) {
    uint identificationId = artifacts[artifactId][1];
    Identification storage identification = identificationData[identificationId];
    identificationData[identificationId] = Identification({
      blockTimeModified: block.timestamp,
      dateModified: clientTimestamp,
      doi: identification.doi,
      rfid: identification.rfid,
      provenance: provenance,
      wallet: identification.wallet
    });
    artifactData[artifactId].identification = identificationData[identificationId];
    return true;
  }

}
