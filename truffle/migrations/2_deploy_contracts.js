const Migrations = artifacts.require("DID.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations, "0x884592D5BE23f2d05e092aE76002108027cc1658");
};
