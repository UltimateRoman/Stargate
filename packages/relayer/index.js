import { ethers } from "ethers";
import * as dotenv from "dotenv";
import StargateOriginatorAbi from "./abis/StargateOriginator.js";
import StargateAcquirerAbi from "./abis/StargateAcquirer.js";

dotenv.config();

const Originator_Goerli = "0xd2DC9CD57134165235DEa8b66e792785aD4F8F35";
const Acquirer_Goerli = "0xf10e09c809a1dCA1e7cB43faD4b3d7860EfC33b9";
const Originator_Hyperspace = "0x176815Dc4dD1E65b76e7430f1E4dC5283B4CbcE0";
const Acquirer_Hyperspace = "0xdcA74ed78491FE09a7808bEcE64053C6B3086739";

const goerliProvider = new ethers.providers.JsonRpcProvider(
  `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const hyperspaceProvider = new ethers.providers.JsonRpcProvider(
  `https://api.hyperspace.node.glif.io/rpc/v1`
);

const goerliWallet = new ethers.Wallet(process.env.PRIVATE_KEY, goerliProvider);
const hyperspaceWallet = new ethers.Wallet(process.env.PRIVATE_KEY, hyperspaceProvider);

const originatorGoerli = new ethers.Contract(Originator_Goerli, StargateOriginatorAbi, goerliProvider);
const acquirerGoerli = new ethers.Contract(Acquirer_Goerli, StargateAcquirerAbi, goerliProvider);
const originatorHyperspace = new ethers.Contract(Originator_Hyperspace, StargateOriginatorAbi, hyperspaceProvider);
const acquirerHyperspace = new ethers.Contract(Acquirer_Hyperspace, StargateAcquirerAbi, hyperspaceProvider);

originatorGoerli.on("DispatchMessage", async (message, sender, recipient) => {
  const tx = await acquirerHyperspace.connect(hyperspaceWallet).receiveMessage(message, sender, recipient);
  await tx.wait();
  console.log("Received message from Goerli", message);
});

originatorHyperspace.on("DispatchMessage", async (message, sender, recipient) => {
  const tx = await acquirerGoerli.connect(goerliWallet).receiveMessage(message, sender, recipient);
  await tx.wait();
  console.log("Received message from Hyperspace", message);
});
