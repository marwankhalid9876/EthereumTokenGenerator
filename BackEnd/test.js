const db = require("./service/fakeDb.js");

const tokendata = db.get("tokendata");

if (tokendata.tknType === "erc20") console.log("ok");
else console.log("no");
