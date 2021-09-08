const simpleToken = artifacts.require("SimpleToken");

module.exports = function (deployer) {
  deployer.deploy(simpleToken, 'mytok', 'sym', 100);
};



