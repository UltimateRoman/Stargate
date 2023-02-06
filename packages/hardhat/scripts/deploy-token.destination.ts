import  { ethers, network } from "hardhat";

const originator = "0x176815Dc4dD1E65b76e7430f1E4dC5283B4CbcE0";
const acquirer = "0xdcA74ed78491FE09a7808bEcE64053C6B3086739";

async function main() {
  const wallet = new ethers.Wallet("", ethers.provider);

  const DestinationToken = await ethers.getContractFactory("DestinationToken", wallet);
  const destinationToken = await DestinationToken.deploy(
    originator,
    acquirer,
    "SimpleToken",
    "SMP"
  );
  await destinationToken.deployed();

//   const destinationToken = DestinationToken.attach("");
//   await destinationToken.mint("". ethers.utils.parseEther("1000"));
//   await destinationToken.setMirroredTokenAddress("");
//   await destinationToken.setOriginator("");
//   await destinationToken.setAcquirer("");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});