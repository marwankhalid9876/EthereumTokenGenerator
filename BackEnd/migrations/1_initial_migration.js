const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage("../scratch");
const tokendata = JSON.parse(localStorage.getItem("tokendata"));

// const db = require("../service/fakeDb.js");

// const tokendata = db.get("tokendata");
// console.log("db", db);
// console.log("tokendata", tokendata);

if (tokendata.tknType === "erc20") {
  const simpleToken = artifacts.require("SimpleToken");

  module.exports = function (deployer, network, accounts) {
    console.log("data is", tokendata);
    deployer.deploy(
      simpleToken,
      tokendata.tknName,
      tokendata.tknSym,
      tokendata.tknSup,
      []
    );
    // deployer.deploy(simpleToken, "mytok", "sym", 100);
  };
} else if (tokendata.tknType === "erc721") {
  const gameItem = artifacts.require("GameItem");

  module.exports = function (deployer, network, accounts) {
    console.log("data is", tokendata);
    deployer.deploy(gameItem, tokendata.tknName, tokendata.tknSym);
    // deployer.deploy(simpleToken, "mytok", "sym", 100);
  };
}
