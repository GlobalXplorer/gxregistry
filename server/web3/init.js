const HDWalletProvider = require("truffle-hdwallet-provider"),
      Web3 = require('web3');

require('dotenv').config();

const INFURA_PROVIDER_URL = `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`;

const setProvider = () => {
  if ((process.env.WEB3PROVIDER === 'metamask') && (web3 !== undefined)) {
    return web3.currentProvider;
  } else if (process.env.WEB3PROVIDER === 'kovan') {
    return new HDWalletProvider(process.env.MNEMONIC, INFURA_PROVIDER_URL, 0, 5);
  } else if (process.env.WEB3PROVIDER === 'ganache-cli') {
    return new Web3.providers.HttpProvider('http://localhost:8545');
  } else {
    err = new TypeError('Web3 provider not detected');
    console.error(err);
    return null;
  }
}

const web3 = new Web3(setProvider());

console.log('web3 initialized');

// if (web3.version.api.startsWith('0.')) {
//   try {
//     if (web3.net.listening) {
//       console.log(`Connected to Web3 version ${web3.version.api} with provider ${JSON.stringify(web3.currentProvider)}`);
//     } else {
//       console.error(`Could not connect to Web3`);
//     }
//   } catch (e) {
//     console.error(e);
//   }
// }

module.exports = web3;
