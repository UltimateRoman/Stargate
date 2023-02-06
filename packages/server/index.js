import abi from "./abi.js";
import { ethers } from "ethers";
const CONTRACT_ADDRESS = "0xbAE08f18a78ada7b4dDceEbb7869B23C414Dd1c4";
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/HP6JXNqDqlgBJTtlGYVh2iugTgcp4OpT%27"
);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

contract.on("DispatchMessage", (caller, tokenID) => {
  //this section is called every time an event is emitted
  console.log(caller);
});
