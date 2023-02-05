import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Wallet } from "ethers";
import {
  StargateOriginator,
  StargateAcquirer
} from "../typechain-types";

describe("Stargate bridge contracts", function () {
  let deployer: Wallet,
      wallet: Wallet,
      stargateOriginator: StargateOriginator,
      stargateAcquirer: StargateAcquirer;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function fixture() {

    // Contracts are deployed using the first signer/account by default
    const [deployer, wallet] = await ethers.getSigners();

    const StargateOriginator = await ethers.getContractFactory("StargateOriginator");
    stargateOriginator = await StargateOriginator.deploy();
    await stargateOriginator.deployed();

    const StargateAcquirer = await ethers.getContractFactory("StargateAcquirer");
    stargateAcquirer = await StargateAcquirer.deploy();
    await stargateAcquirer.deployed();
  }

  describe("Deployment", function () {
    beforeEach("deploy contracts", async () => {
      await loadFixture(fixture);
    });

    it("Contracts deploy successfully", async function () {
      expect(stargateOriginator.address).to.not.be.undefined;
      expect(stargateAcquirer.address).to.not.be.undefined;
    });
  });
});
