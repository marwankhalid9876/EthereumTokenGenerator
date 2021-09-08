const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFile = require("./compile");
 
const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;
 

const provider = new HDWalletProvider(
'pelican enable chief quality install huge pear acid speak into match river',
'https://rinkeby.infura.io/v3/668fd647f9d045b6ac8812a06b850b82'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(interface);
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: ['myToken','sym',100]})
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

    console.log('Contract deployed to ', result.options.address);
};
deploy();