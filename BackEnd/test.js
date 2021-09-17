const db = require("./service/fakeDb.js");

// db.updateUser("avc", { name: "eee" });
db.updateUserTokenAdd("abc", { lua: "soma" });
// db.updateUserDestroy("avc", "tokens");

console.log(db.get("users"));
