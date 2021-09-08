const gameItem = artifacts.require("GameItem");

module.exports = function (deployer) {
  deployer.deploy(gameItem, 'mytok', 'sym');
};
