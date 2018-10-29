const Web3 = require('web3');

const setProvider = () => {
  if ((process.env.WEB3PROVIDER === 'metamask') && (web3 !== undefined)) {
    return web3.currentProvider;
  } else if (process.env.WEB3PROVIDER === 'kovan') {
    return `https://kovan.infura.io/v3/8e048fb4b7c14dde8c32d668089353a7`;
  } else if (process.env.WEB3PROVIDER === 'ganache-cli') {
    return 'http://localhost:8545';
  } else {
    err = new TypeError('Web3 provider not detected');
    console.error(err);
    return null;
  }
}

const provider = new Web3.providers.HttpProvider(setProvider());
const web3 = new Web3(provider);

if (web3.version.api.startsWith('0.')) {
  if (web3.isConnected()) {
    console.log(`Connected to Web3 version ${web3.version.api} with provider ${JSON.stringify(web3.currentProvider)}`);
  } else {
    console.error(`Could not connect to Web3`);
  }
}

module.exports = web3;
