const web3 = require('./init');

exports.isConnected = () => {
  return web3.isConnected();
}

/* CONTRACTS */
// const REGISTRY_ABI = require('../../ethereum/build/contracts/Registry');
// const REGISTRY_ADDRESS = require('../../ethereum/build/config').registry;
// exports.RegistryContract = new web3.eth.Contract(REGISTRY_ABI, REGISTRY_ADDRESS);
//
// const REGISTRARS_ABI = require('../../ethereum/build/contracts/Registars');
// const REGISTRARS_ADDRESS = require('../../ethereum/build/config').registrars;
// exports.RegistrarsContract = new web3.eth.Contract(REGISTRARS_ABI, REGISTRARS_ADDRESS);

/* TRANSACTIONS */
exports.personalSign = (msg) => {
  web3.personal.sign(
    web3.fromUtf8(JSON.stringify(msg)),
    web3.eth.coinbase,
    (err, signature) => {
      console.error(err);
      console.log(signature);
    }
  );
}

/* MESSAGE CALLS */
