module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", //localhost port
      port: 7545, //you can see it on Ganache
      network_id: "*", // Match any network id
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
