const { LocalStorage } = require("node-localstorage");

global.localStorage = new LocalStorage("./scratch");
localStorage = new LocalStorage("./scratch");

// localStorage.setItem("tokendata", JSON.stringify(tokendata));
// const tokendata = JSON.parse(localStorage.getItem("tokendata"));

class db {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  destroy(key) {
    localStorage.removeItem(key);
  }
  add(key, value) {
    let newData = this.get(key);
    newData.push(value);
    this.set(key, newData);
  }
  localStorage() {
    return localStorage;
  }
}

module.exports = new db();
