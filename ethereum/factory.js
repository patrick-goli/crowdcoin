import web3 from "./web3";
const address = "0xa64eFb6B8c05A50F278b7F79097AE91fB4769fAE";
const compiledFactory = require("./build/CampaignFactory.json");

export default new web3.eth.Contract(JSON.parse(compiledFactory.interface), address);
