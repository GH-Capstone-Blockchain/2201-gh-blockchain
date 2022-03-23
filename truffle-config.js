require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
// const privateKeys = [
//   "8057a86d480d7b9aea3b826b8e7caa0d2260f2cdf3d28ca70ef3b62dbc3bb9a0",
//   "c3bb1181d37b86ad1a06a39f472eebfedcc4622b59cde7cb8684b530ee03b290",
// ];

const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", //localhost port
      port: 7545, //you can see it on Ganache
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          //Private Key get it from Ganache splited into an array
          // privateKeys,
          privateKeys.split(","),
          //Url to an Ethereum Node
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
          0,
          2
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3, // Kovan = 42, Rinkeby = 4, ropsten = 3
    },
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./build/contracts/",

  compilers: {
    solc: {
      version: "^0.8",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
