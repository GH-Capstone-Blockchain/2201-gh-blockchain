const Escrow = artifacts.require("../contracts/Escrow.sol");

const projectAddress = "0x617F2E2fD72FD9D5503197092aC168c91465E7f2";
const projectGoal = 100;

module.exports = function (deployer) {
  deployer.deploy(Escrow, projectAddress, projectGoal);
};
