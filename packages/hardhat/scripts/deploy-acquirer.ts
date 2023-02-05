import  { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const StargateAcquirer = await ethers.getContractFactory("StargateAcquirer");
  const stargateAcquirer = await StargateAcquirer.deploy();
  await stargateAcquirer.deployed();

  if (network.config.chainId == 5) {
    console.log("Deployed Acquirer on Goerli at", stargateAcquirer.address);
  } else if (network.config.chainId == 3141) {
    console.log("Deployed Acquirer on Hyperspace at", stargateAcquirer.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});