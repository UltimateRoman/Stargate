import  { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const StargateOriginator = await ethers.getContractFactory("StargateOriginator");
  const stargateOriginator = await StargateOriginator.deploy();
  await stargateOriginator.deployed();

  if (network.config.chainId == 5) {
    console.log("Deployed Originator on Goerli at", stargateOriginator.address);
  } else if (network.config.chainId == 3141) {
    console.log("Deployed Originator on Hyperspace at", stargateOriginator.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
