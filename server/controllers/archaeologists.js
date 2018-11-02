// archaeologists controller

const web3Utils = require('../web3/utils');
const contract = web3Utils.registryInstance;

exports.get = async (req, res) => {
  const promise = web3Utils.promisify(contract.getArchaeologists);
  const archaeologists = await promise;
  res.send({ archaeologists });
}

exports.getById = async (req, res) => {
  const id = req.params.id;
  const promise = web3Utils.promisify(contract.getArchaeologistById, id);
  const archaeologist = await promise;
  res.send({ [id]: archaeologist });
}

exports.add = async (req, res) => {
  const address = req.body.address;
  const promise = web3Utils.promisify(contract.addArchaeologist, address);
  const id = await promise;
  res.send({ "archaeologist": address, id });
}
