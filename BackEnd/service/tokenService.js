const fs = require("fs");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

class tokenService {
  getContractMethods(mnemonic, DAI) {
    const contract = JSON.parse(
      fs.readFileSync("../build/contracts/SimpleToken.json", "utf8")
    );
    const contABI = contract["abi"];

    const DAI_ADDRESS = "0x2d577B84Efd29DA7AfEa2E7Abc8bF201CA1a4268";

    const provider = new HDWalletProvider(
      "pelican enable chief quality install huge pear acid speak into match river",
      "https://rinkeby.infura.io/v3/668fd647f9d045b6ac8812a06b850b82"
    );
    const web3 = new Web3(provider);

    const daiToken = new web3.eth.Contract(contABI, DAI_ADDRESS);

    console.log(daiToken.methods);
  }
}

module.exports = new tokenService();
