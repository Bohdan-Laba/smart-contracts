const MessageStorageContract = artifacts.require("MessageStorage");

module.exports = function (deployer) {
    deployer.deploy(MessageStorageContract);
};