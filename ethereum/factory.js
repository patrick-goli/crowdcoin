import web3 from "./web3";
const address = "0x17e280fbc12E930D9E4c905D9C38b802348B2186";
const compiledFactory = require("./build/CampaignFactory.json");

export default new web3.eth.Contract(JSON.parse(compiledFactory.interface), address);
