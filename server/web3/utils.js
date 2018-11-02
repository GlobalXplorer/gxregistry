const web3 = require('./init'),
      axios = require('axios');

exports.INFURA_API_URL = (method) =>
  `https://api.infura.io/v1/jsonrpc/kovan/${method}?token=${process.env.INFURA_API_KEY}`;

exports.promisify = (fun, params=[]) => {
  return new Promise((resolve, reject) => {
    fun(...params, (err, data) => {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
}

exports.getAxiosPromise = (method, url, params=undefined, body=undefined) => {
  if (method === "GET" | method === "get") {
    return axios.get(url);
  } else if (method === "POST" | method === "post") {
    return axios.post(url, body);
  } else {
    throw Error("Invalid method argument");
  }
}

exports.axiosHandler = async (promises) => {
  const results = await Promise.all(promises);
  return results;
}

// exports.testInfuraConnection = () => {
//   const requests = [
//     getAxiosPromise('get', INFURA_API_URL('eth_accounts'))
//   ];
//   const results = axiosHandler(requests);
//   return results;
// }

/* ETH */
exports.isConnected = () => {
  return web3.isConnected();
}
exports.addresses = web3.currentProvider.addresses;
exports.balance = (address) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, data) => {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
}

exports.bigNumberToDecimal = (bigNumber) => {
  const hex = web3.toHex(bigNumber);
  return web3.toDecimal(hex);
}

/* CONTRACTS */
exports.REGISTRY_ABI = require('../../ethereum/build/contracts/Registry.json').abi;
exports.REGISTRY_ADDRESS = require('../../ethereum/build/config').registryAddress;
exports.registryInstance = web3.eth.contract(exports.REGISTRY_ABI).at(exports.REGISTRY_ADDRESS);

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
