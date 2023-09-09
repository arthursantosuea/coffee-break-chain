var LeafDataStorage = artifacts.require("../contracts/LeafDataStorage.sol");

module.exports = function(deployer) {
    deployer.deploy(LeafDataStorage);
}
