const Campaign = artifacts.require("../contracts/Campaign.sol");

module.exports = function (deployer) {
  deployer.deploy(Campaign);
};
