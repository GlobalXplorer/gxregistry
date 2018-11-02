// artifacts controller

const web3Utils = require('../web3/utils');
const crypto = require('crypto');
const contract = web3Utils.registryInstance;

// An artifact is represented on-chain as an array of integer identifiers:
// e.g. [uid, identificationId, attributionId, locationId]
// Order matters!

exports.get = async (req, res) => {
  const promise = web3Utils.promisify(contract.getArtifacts);
  const artifacts = await promise;
  const uids = artifacts.map((a) => a[0]);
  res.send({ "artifact_uids": uids });
}

exports.getById = async (req, res) => {
  const promiseArtifact = web3Utils.promisify(
    contract.getArtifactById, req.params.id
  );
  const idBigNumbers = await promiseArtifact;
  const ids = idBigNumbers.map(i => web3Utils.bigNumberToDecimal(i));
  const promiseIdentification = new Promise((resolve, reject) => {
    contract.getIdentificationById(ids[1], (err, data) => {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
  const promiseAttribution = new Promise((resolve, reject) => {
    contract.getAttributionById(ids[2], (err, data) => {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
  const promiseLocation = new Promise((resolve, reject) => {
    contract.getLocationById(ids[3], (err, data) => {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
  const [identification, attribution, location] = await Promise.all([
    promiseIdentification,
    promiseAttribution,
    promiseLocation
  ]);
  // Include data from db for this artifact
  // const data = db.Artifact(uid);
  // Format resulting data as json
  const artifact = {
    // identification
    blockTimeModified: identification[0],
    dateModified: identification[1],
    doi: identification[2],
    rfid: identification[3],
    provenance: identification[4],
    wallet: identification[5],
    // attribution
    dateFound: attribution[0],
    archaeologist: attribution[1],
    governmentVerifier: attribution[2],
    owner: attribution[3],
    // location
    holder: location[0],
    currentLatitude: location[1],
    currentLongitude: location[2],
    transitStatus: location[3]
    // ...data
  }
  res.send({ ...artifact });
}

exports.create = async (req, res) => {
  // Create provenance hash from artifact data
  const data = {
    objectType: req.body.objectType,
    objectName: req.body.objectName,
    description: req.body.description,
    artist: req.body.artist,
    measurements: req.body.mesaurements,
    weight: req.body.weight,
    colors: req.body.colors,
    originationCountry: req.body.originationCountry,
    siteName: req.body.siteName,
    siteClassification: req.body.siteClassification,
    materials: req.body.materials,
    period: req.body.period,
    chronology: req.body.chronology,
    condition: req.body.condition,
    curator: req.body.curator,
    mediaURL: req.body.mediaURL
  }
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  const provenance = hash.digest('hex');
  // Create attribute sets
  const rfidNumber = req.body.rfidNumber;
  const doi = `GX0000.${getInitialsFromName(req.body.archaeologistName) + Date.now().getYear()}.${rfidNumber}`;
  const identification = {
    dateModified: Date.now(),
    doi,
    rfid: rfidNumber,
    provenance,
    wallet: req.body.walletAddress
  }
  const attribution = {
    dateFound: req.body.dateFound,
    governmentVerifier: req.body.governmentVerifierAddress,
    owner: req.body.ownerAddress
  }
  const location = {
    currentLatitude: req.body.currentLatitude,
    currentLongitude: req.body.currentLongitude,
    transitStatus: req.body.transitStatus
  }
  // Store attributes onchain to compose the onchain artifact
  const promiseIdentification = web3Utils.promisify(
    contract.createIdentification, ...identification
  );
  const promiseAttribution = web3Utils.promisify(
    contract.createAttribution, ...attribution
  );
  const promiseLocation = web3Utils.promisify(
    contract.createLocation, ...location
  );
  const [identificationId, attributionId, locationId] = await Promise.all([
    promiseIdentification,
    promiseAttribution,
    promiseLocation
  ]);
  const promiseArtifact = web3Utils.promisify(
    contract.addArtifact, [identificationId, attributionId, locationId] // order matters!
  );
  const artifactId = await promiseArtifact;
  // Once we have confirmed the data is onchain via tx receipt,
  // store it in the database.
  // db.CreateArtifact(artifactId, data, latestTxId);
  res.send({ "artifact_id": artifactId });
}

exports.relocate = async (req, res) => {
  /*
   * Updates the location data of the artifact with the specified id.
   * Only an artifact's owner account can update its location data.
   */
  // TODO: Decide what data the provenance hash includes and alter smart
  // smart contract to require provenance on relocation accordingly.
  // NOTE: This code should change soon!
  const promiseArtifact = web3Utils.promisify(
    contract.getArtifactById, req.params.id
  );
  const ids = await promiseArtifact;
  const uid = ids[0];
  const promiseIdentification = web3Utils.promisify(
    contract.getIdentificationById, ids[1]
  );
  const params = [
    uid,
    Date.now(),
    "error", // provenance
    req.body.newHolder,
    req.body.currentLatitude,
    req.body.currentLongitude,
    req.body.transitStatus
  ];
  const promiseUpdate = web3Utils.promisify(
    contract.updateArtifactLocation, ...params
  );
  const success = await promise;
  res.send({ success });
}

/* HELPERS */
const getInitialsFromName = (fullName) => {
  const names = fullName.strip().split(" ");
  const initial1 = names[0][0];
  const initial2 = names[1][0];
  return(initial1 + initial2);
}
