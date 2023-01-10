require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require("./build/CampaignFactory.json");
const compiledCampaign = require("./build/Campaign.json");
const SECRET_RECOVERY_PHRASE = process.env.SECRET_RECOVERY_PHRASE;
const ETH_TESTNET_API = process.env.ETH_TESTNET_API;
const provider=new HDWalletProvider(SECRET_RECOVERY_PHRASE, ETH_TESTNET_API);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts)
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
