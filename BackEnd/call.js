const fs = require("fs");
const HDWalletProvider = require("truffle-hdwallet-provider");

const contract = JSON.parse(
  fs.readFileSync("./build/contracts/GameItem.json", "utf8")
);
const contABI = contract["abi"];

const DAI_ADDRESS = "0x2d577B84Efd29DA7AfEa2E7Abc8bF201CA1a4268";

const Web3 = require("web3");
const provider = new HDWalletProvider(
  "pelican enable chief quality install huge pear acid speak into match river",
  "https://rinkeby.infura.io/v3/668fd647f9d045b6ac8812a06b850b82"
);

const web3 = new Web3(provider);

const daiToken = new web3.eth.Contract(contABI, DAI_ADDRESS);

const senderAddress = "0xbf09c99396EEB4F7E0ccA7d3de36b1b7DC87E984";
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE";

// daiToken.methods.inWlist(receiverAddress).call(function (err, res) {
daiToken.methods.inWlist(receiverAddress).call(function (err, res) {
  if (err) {
    console.log("An error occured", err);
    return;
  }
  console.log("inWlist?", res);
});

// daiToken.methods
//   .addtoWlist(receiverAddress)
//   .send(
//     { from: senderAddress, gas: "1000000", gasPrice: "5000000000" },
//     function (err, res) {
//       if (err) {
//         console.log("An error occured", err);
//         return;
//       }
//       console.log("Hash of the transaction: " + res);
//     }
//   );
