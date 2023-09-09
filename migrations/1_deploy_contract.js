var LeafDataStorage = artifacts.require("./LeafDataStorage.sol");

module.exports = function(deployer) {
    deployer.deploy(LeafDataStorage);
}
