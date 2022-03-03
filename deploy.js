const path = require("path");
const fs = require("fs-extra"); // fs with extra functions
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');

const compiledContractPath = './src/ethereum/build/EHealth.json';
const compiledContract = require(compiledContractPath);

// Mnemonic from a test account and an Infura provider
const provider = new HDWalletProvider(
  'floor tomato dose vocal coconut suspect exotic hair differ network correct text',
  'https://rinkeby.infura.io/v3/5ba39b784cea40e189f3abd493f99813'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  // We deploy the EDelivery smart contract to the Rinkeby test network
  const result = await new web3.eth.Contract(compiledContract.abi)
    .deploy({ data: compiledContract.evm.bytecode.object, arguments: [] })
    .send({ from: accounts[0], gas: '6000000' });

  // fs.writeFileSync('./CONTRACTADDRESS', result.options.address);
  compiledContract.address = result.options.address;

  fs.outputJsonSync(
    path.resolve(__dirname, compiledContractPath),
    compiledContract,
    {spaces: 2} // Indent json output with 2 spaces
  );
  
  console.log('Contract deployed to Rinkeby network, at address ', result.options.address);
};

deploy();
