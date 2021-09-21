const fs = require("fs");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
var path = require("path");

class tokenService {
  getContractMethods(mnemonic, contractAddress, tknType) {
    const contract = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          tknType == "erc20"
            ? "../build/contracts/SimpleToken.json"
            : "../build/contracts/GameItem.json"
        ),
        "utf8"
      )
    );
    const contABI = contract["abi"];

    const DAI_ADDRESS = contractAddress;

    const provider = new HDWalletProvider(
      mnemonic,
      "https://rinkeby.infura.io/v3/668fd647f9d045b6ac8812a06b850b82"
    );
    const web3 = new Web3(provider);

    const daiToken = new web3.eth.Contract(contABI, DAI_ADDRESS);

    // console.log(daiToken.methods.decreaseAllowance(null, null));
    // console.log(
    //   daiToken.methods["decreaseAllowance"].apply(null, ["hello", "world"])
    // );
    // console.log(daiToken.methods["decreaseAllowance"](null, null));

    let ctr = 0;
    const methodNames = Object.entries(daiToken.methods)
      .map(([item, value]) => item)
      .filter((item) => 
        item.includes('(')
      );

    return methodNames;
  }

  callMethod(mnemonic, contractAddress, methodName, args, tknType, callBack) {
    const contract = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          tknType == "erc20"
            ? "../build/contracts/SimpleToken.json"
            : "../build/contracts/GameItem.json"
        ),
        "utf8"
      )
    );
    const contABI = contract["abi"];

    const provider = new HDWalletProvider(
      mnemonic,
      "https://rinkeby.infura.io/v3/668fd647f9d045b6ac8812a06b850b82"
    );
    const web3 = new Web3(provider);

    const DAI_ADDRESS = contractAddress;

    const fromAddress = provider.address;

    const daiToken = new web3.eth.Contract(contABI, DAI_ADDRESS);

    const onlyArgs = args.map((arg) => arg.value);

    const payable = daiToken._jsonInterface
      .filter((arg) => {
        if (arg.stateMutability == undefined) return true;
        else
          return !["nonpayable", "view", "pure"].includes(arg.stateMutability);
      })
      .map((arg) => arg.name);

      if (payable.includes(methodName)) {
        console.log("sending");
      return daiToken.methods[methodName]
        .apply(null, onlyArgs)
        .send(
          { from: fromAddress, gas: "1000000", gasPrice: "5000000000" },
          function (err, res) {
            if (err) {
              console.log("An error occured", err);
              return;
            }
            console.log("Hash of the transaction: " + res);
            callBack(res);
          }
        );
    } else {
      console.log("calling");
      return daiToken.methods[methodName]
        .apply(null, onlyArgs)
        .call(function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          console.log("resullt", res);
          callBack(res);
        });
    }

    // daiToken.methods[methodName].apply(null, onlyArgs);
  }
}

module.exports = new tokenService();
