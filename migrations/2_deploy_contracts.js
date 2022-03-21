const Escrow = artifacts.require("../contracts/Escrow.sol");

const projectAddress = "0x7677EDee2A44ae5D30a1088653f61F6361e92E2a";
const projectGoal = 100;

module.exports = function (deployer) {
  deployer.deploy(Escrow, projectAddress, projectGoal);
};
