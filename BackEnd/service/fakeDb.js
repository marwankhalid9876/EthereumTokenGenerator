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

  addUser(mnemonic) {
    let users = this.get("users");
    const index = users.findIndex((user) => user.mnemonic === mnemonic);
    if (index == -1) {
      let user = { mnemonic: mnemonic, tokens: [] };
      users.push(user);
      this.set("users", users);
    } else {
      // DO nothing already added
    }
  }

  updateUserAdd(mnemonic, newData) {
    let newUsers = this.get("users");
    const index = newUsers.findIndex((user) => user.mnemonic === mnemonic);
    newUsers[index] = { ...newUsers[0], ...newData };

    // console.log(newUsers);
    this.set("users", newUsers);
  }
  updateUserDestroy(mnemonic, dataKey) {
    let newUsers = this.get("users");
    const index = newUsers.findIndex((user) => user.mnemonic === mnemonic);
    delete newUsers[index][dataKey];

    // console.log(newUsers);
    this.set("users", newUsers);
  }
  updateUserTokenAdd(mnemonic, data) {
    let newUsers = this.get("users");
    const index = newUsers.findIndex((user) => user.mnemonic === mnemonic);

    let tokenArray = newUsers[index]["tokens"];

    // console.log(tokenArray);
    tokenArray.push(data);
    newUsers[index]["tokens"] = tokenArray;

    // console.log(newUsers);
    this.set("users", newUsers);
  }
  getUserTokens(mnemonic) {
    let newUsers = this.get("users");
    const index = newUsers.findIndex((user) => user.mnemonic === mnemonic);

    let tokenArray = newUsers[index]["tokens"];
    return tokenArray;
  }
  getContractInfo(mnemonic, blockTimeStamp) {
    let newUsers = this.get("users");
    const index = newUsers.findIndex((user) => user.mnemonic === mnemonic);

    let tokenArray = newUsers[index]["tokens"];
    const filterd = tokenArray.filter(
      (contract) => contract.block_timestamp == blockTimeStamp
    );

    return filterd[0];
  }
  updateUserTokenRemove(mnemonic, key) {
    // let newUsers = this.get("users");
    // const index = newUsers.findIndex((user) => user.mnemonic === mnemonic);
    // let tokenArray = newUsers[index]["tokens"];
    // if (tokenArray == undefined) {
    //   this.updateUserAdd(mnemonic, { tokens: [] });
    // }
    // tokenArray = newUsers[index]["tokens"];
    // tokenArray.push(data);
    // newUsers[index]["tokens"] = tokenArray;
    // // console.log(newUsers);
    // this.set("users", newUsers);
  }

  localStorage() {
    return localStorage;
  }
}

module.exports = new db();
