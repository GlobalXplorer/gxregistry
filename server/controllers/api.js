// api controller

const web3Utils = require('../web3/utils');

exports.test = (req, res) => {
  res.send({"web3 connected": web3Utils.isConnected()});
}
