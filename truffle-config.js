module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", //localhost port
      port: 7545, //you can see it on Ganache
      network_id: "*", // Match any network id
    },
  },
  // contracts_directory: './src/contracts/',
  // contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
