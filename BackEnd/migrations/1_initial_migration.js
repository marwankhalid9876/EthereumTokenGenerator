const simpleToken = artifacts.require("SimpleToken");

module.exports = function (deployer) {
  const tokendata = fetch("localhost:8080/getTokenData");

  console.log("data is", tokendata);
  deployer.deploy(
    simpleToken,
    tokendata.tknName,
    tokendata.tknSym,
    tokendata.tknSup
  );
  // deployer.deploy(simpleToken, "mytok", "sym", 100);
};
