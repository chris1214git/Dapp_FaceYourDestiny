var Anubis = artifacts.require("./Anubis.sol");

module.exports = function(deployer) {
  deployer.deploy(Anubis);
};