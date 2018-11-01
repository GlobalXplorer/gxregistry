/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 25000000000,
 *   },
 */
require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = process.env.MNEMONIC;
const provider = `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // Network ids: https://ethereum.stackexchange.com/a/17101
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, provider, 1, 4),
      network_id: 42,
      // gas: 6000000, // wei
      // gasPrice: 10000000000
    }
  }
};
