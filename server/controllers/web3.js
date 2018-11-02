// web3 controller

const web3Utils = require('../web3/utils');

exports.addresses = (req, res) => {
  res.send({ "account_addresses": web3Utils.addresses });
}

exports.addressById = (req, res) => {
  const i = req.params.id;
  res.send({ [i]: web3Utils.addresses[i] });
}

exports.balance = async (req, res) => {
  const i = req.params.id;
  const address = web3Utils.addresses[i];
  const balance = await web3Utils.balance(address);
  res.send({ address, balance });
}

exports.contract = (req, res) => {
  res.send({ "contract_address": web3Utils.REGISTRY_ADDRESS });
}
