const db = require("./service/fakeDb.js");
const parseDeployment = require("./service/Parser");
const fs = require("fs");
const parsedOut = parseDeployment(
  fs.readFileSync("truffle example run.txt").toString()
);
console.log(db.getUserTokens("aaa"));
// db.updateUserTokenAdd("aaa", parsedOut);
