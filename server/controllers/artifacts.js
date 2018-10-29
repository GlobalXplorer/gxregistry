// artifacts controller
//const S3 = require('s3');

const web3Utils = require('../web3/utils');
const crypto = require('crypto');

exports.create = (req, res) => {
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
  const dataHash = crypto.createHmac('sha256').update(data).digest('base64');
  const rfidNumber = req.body.rfidNumber;
  const doi = `GX0000.${getInitialsFromName(req.body.archaeologistName) + Date.now().getYear()}.${rfidNumber}`;
  const message = {
    dateFound: req.body.dateFound,
    timestamp: Date.now(),
    archaeologist: req.body.archaeologistAddress,
    wallet: req.body.walletAddress,
    walletHolder: req.body.walletHolder,
    governmentVerifier: req.body.governmentVerifierAddress,
    doi: doi,
    rfid: rfidNumber,
    owner: req.body.ownerAddress,
    holder: req.body.holderAddress,
    transitStatus: req.body.transitStatus,
    currentLatitude: req.body.currentLatitude,
    currentLongitude: req.body.currentLongitude,
    dataHash: dataHash
  }
  // store data onchain
  web3Utils.personalSign(message);
  // save all attributes to db
  const attributes = {...message, ...data};
  // db.CreateArtifact(attributes);
}

exports.getById = () => {
  // call to web3
}

/* HELPERS */
const getInitialsFromName = (fullName) => {
  const names = fullName.strip().split(" ");
  const initial1 = names[0][0];
  const initial2 = names[1][0];
  return(initial1 + initial2);
}
