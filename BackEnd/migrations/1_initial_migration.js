const simpleToken = artifacts.require("SimpleToken");
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage("../scratch");
const tokendata = JSON.parse(localStorage.getItem("tokendata"));

module.exports = function (deployer, network, accounts) {
  console.log("data is", tokendata);
  deployer.deploy(
    simpleToken,
    tokendata.tknName,
    tokendata.tknSym,
    tokendata.tknSup
  );
  // deployer.deploy(simpleToken, "mytok", "sym", 100);
};
