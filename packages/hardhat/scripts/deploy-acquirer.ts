import  { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const StargateAcquirer = await ethers.getContractFactory("StargateAcquirer");
  const stargateAcquirer = await StargateAcquirer.deploy();
  await stargateAcquirer.deployed();

  const RELAYER_ROLE = ethers.utils.id("RELAYER_ROLE");
  await stargateAcquirer.grantRole(RELAYER_ROLE, "0x171ca1f2fbd10df7850887d57bdcdede08de21c3");

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