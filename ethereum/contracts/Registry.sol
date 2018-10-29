pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

// import './Archaeologists.sol';

/** @title Registry. */
contract Registry {
  address public contractOwner;
  mapping (address => bool) public contractDelegates;

  uint public artifactsRegistered = 0;
  mapping (uint => Artifact) public artifacts;
  mapping (address => string) public walletHolders;

  uint public archaeologistsRegistered = 0;
  address[] public archaeologists;
  mapping (address => bool) public isArchaeologist;

  // Archaeologists archaeologists

  /** @dev Artifact details of the artifact being added.
    * @param timestamp Client unix time of verification.
    * @TBC
    */
  struct Artifact {
    uint id;
    uint timestamp; // unix
    uint blockTime; // block.timestamp
    string doi;
    string rfid;
    Verification verification;
    Tracking tracking;
    bytes dataHash;
    address wallet;
    string walletHolder;
  }

  /** @dev Verification supports the provenance of the artifact.
    * @param dateFound Date in unix time that the artifact was found.
    * @param archaeologist Address of the archaeologist registering the artifact
    * @TBC
    */
  struct Verification {
    uint dateFound;
    address archaeologist;
    address governmentVerifier;
    address owner;
  }

  /** @dev Tracking details the location of the artifact.
    * @param holder Address of the identity currently holding the artifact.
    * @TBC
    */
  struct Tracking {
    address holder;
    string currentLatitude;
    string currentLongitude;
    string transitStatus;
  }

  constructor(/* address _delegate*/) public {
    contractOwner = msg.sender;
    contractDelegates[msg.sender] = true;
  }

  modifier onlyContractOwner {
    require(msg.sender == contractOwner);
    _;
  }

  modifier onlyAuthorized(address _address) {
    require(contractDelegates[_address] == true);
    _;
  }

  modifier onlyArchaeologists(address _address) {
		require(archaeologists[_address] == true);
		_;
	}

  // external
  function addArchaeologist(
    address _address
  ) external onlyAuthorized(msg.sender) returns (uint) {
    archaeologists.push(_address);
    isArchaeologist[_address] = true;
    return archaeologistsRegistered++;
  }

  // public
  function getArchaeologists() public view returns (address[]) {
    return archaeologists;
  }

  // internal

  // private

  /* function createArtifact(
    uint timestamp,
    string doi,
    string rfid,
    uint dateFound,
    address governmentVerifier,
    address owner,
    address holder,
    string currentLatitude,
    string currentLongitude,
    string transitStatus,
    bytes dataHash,
    address wallet
    ) public isArchaeologist(msg.sender) returns (uint) {
		//store this asset's name
		assetNames.push(name);

		//create the new asset with this name, unique ID, and the owner
		allAssets[assetCtr] = AssetData({owner: msg.sender});

        return artifactsRegistered++;
	} */
}
