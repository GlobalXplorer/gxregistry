const web3Utils = require('../web3/utils');
const contract = web3Utils.registryInstance;

exports.getById = async (req, res) => {
  const promiseAttribution = web3Utils.promisify(
    contract.getAttributionById, req.params.id
  );
  const out = await promiseAttribution;
  res.send({ out });
}
