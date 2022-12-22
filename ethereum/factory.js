import web3 from "./web3";
const address = "0xc2f9EEBc36156151a67cFEF122e936C02717f00f";
const compiledFactory = require("./build/CampaignFactory.json");

export default new web3.eth.Contract(JSON.parse(compiledFactory.interface), address);
