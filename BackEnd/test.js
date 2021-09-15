const { LocalStorage } = require("node-localstorage");

global.localStorage = new LocalStorage("./scratch");
// localStorage.setItem("tokendata", { data: "eee" });
// localStorage.setItem("etokendata", { data: "eee" });
// localStorage.setItem("ctokendata", { data: "eee" });
// localStorage.setItem("a", { data: "eee" });
localStorage.setItem("myFirstKey", JSON.stringify({ data: "hellop" }));
console.log(JSON.parse(localStorage.getItem("myFirstKey")));
