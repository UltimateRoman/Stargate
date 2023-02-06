import  { ethers, network } from "hardhat";

const originator = "0xd2DC9CD57134165235DEa8b66e792785aD4F8F35";
const acquirer = "0xf10e09c809a1dCA1e7cB43faD4b3d7860EfC33b9";

async function main() {
  const [deployer] = await ethers.getSigners();

  const OriginToken = await ethers.getContractFactory("OriginToken");
  const originToken = await OriginToken.deploy(
    originator,
    acquirer,
    "SimpleToken",
    "SMP"
  );
  await originToken.deployed();

//   const originToken = OriginToken.attach("");
//   await originToken.mint("". ethers.utils.parseEther("1000"));
//   await originToken.setMirroredTokenAddress("");
//   await originToken.setOriginator("");
//   await originToken.setAcquirer("");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});