const db = require("./service/fakeDb.js");
const parseDeployment = require("./service/Parser");
const fs = require("fs");
const tokenService = require("./service/tokenService.js");

const parsedOut = parseDeployment(
  fs.readFileSync("truffle example run.txt").toString()
);
// console.log(db.getUserTokens("aaa"));

// db.updateUserTokenAdd("aaa", parsedOut);

// tokenService.getContractMethods();

// const result = tokenService.getContractMethods(
//   "pelican enable chief quality install huge pear acid speak into match river",
//   "0x4c0dc7A9C7ceC8C7e6B839879c01137c8b8519EF"
// );
// console.log(result);

// const args = [
//   { name: "address", value: "123" },
//   { name: "uint256", value: "1233" },
// ];
const args = [];

tokenService.callMethod(
  "pelican enable chief quality install huge pear acid speak into match river",
  "0xe6216bf29989409F4d8744F59ce878bFb5d5E606",
  "decimals",
  args,
  (res) => console.log("outer res", res)
);
