const { getData } = require("../../service/tokenInfoStore.js");

const simpleToken = artifacts.require("SimpleToken");

tknInfo = getData();

module.exports = function (deployer) {
  console.log("data is", tknInfo);
  deployer.deploy(simpleToken, tknInfo.tknName, tknInfo.tknSym, tknInfo.tknSup);
  // deployer.deploy(simpleToken, "mytok", "sym", 100);
};
