const web3Utils = require('../web3/utils');
const contract = web3Utils.registryInstance;

exports.getById = async (req, res) => {
  const promiseIdentification = web3Utils.promisify(
    contract.getIdentificationById, req.params.id
  );
  const out = await promiseIdentification;
  res.send({ out });
}
