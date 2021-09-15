const fs = require("fs");

const Store = () => {
  const save = (identifier, data) => {
    let obj = {};
    obj[identifier] = JSON.stringify(data);
    fs.writeFileSync("store.store", obj);
  };
  const get = (identifier) => {
    return JSON.parse(fs.readFileSync("store.store").get(identifier));
  };
};

module.exports = { Store };
