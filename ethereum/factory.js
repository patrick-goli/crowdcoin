import web3 from "./web3";
const address = "0x74e8D8D7c18Ff970B7ada4B23715bc140D1bc403";
const compiledFactory = require("./build/CampaignFactory.json");

export default new web3.eth.Contract(JSON.parse(compiledFactory.interface), address);
