const web3Utils = require('../web3/utils');
const contract = web3Utils.registryInstance;

exports.getById = async (req, res) => {
  const promiseLocation = web3Utils.promisify(
    contract.getLocationById, req.params.id
  );
  const out = await promiseLocation;
  res.send({ out });
}
