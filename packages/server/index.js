const ethers = require('ethers');
const CONTRACT_ADDRESS = "0x10820dB......";
const ABIJSON = require('./abi.json');
provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABIJSON.abi, provider);

contract.on("eventName", ( caller,tokenID) => {
      //this section is called every time an event is emitted 
})