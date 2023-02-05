import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import {
  StargateOriginator,
  StargateAcquirer
} from "../typechain-types";

describe("Stargate bridge contracts", function () {
  let deployer: Signer,
      wallet: Signer,
      stargateOriginator: StargateOriginator,
      stargateAcquirer: StargateAcquirer;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function fixture() {

    // Contracts are deployed using the first signer/account by default
    [deployer, wallet] = await ethers.getSigners();

    const StargateOriginator = await ethers.getContractFactory("StargateOriginator");
    stargateOriginator = await StargateOriginator.deploy();
    await stargateOriginator.deployed();

    const StargateAcquirer = await ethers.getContractFactory("StargateAcquirer");
    stargateAcquirer = await StargateAcquirer.deploy();
    await stargateAcquirer.deployed();
  }

  beforeEach("deploy contracts", async () => {
    await loadFixture(fixture);
  });

  describe("Deployment", function () {
    it("Contracts deploy successfully", async function () {
      expect(stargateOriginator.address).to.not.be.undefined;
      expect(stargateAcquirer.address).to.not.be.undefined;
      expect(stargateOriginator.address).to.not.equal(ethers.constants.AddressZero);
      expect(stargateAcquirer.address).to.not.not.equal(ethers.constants.AddressZero);
    });
  });

  describe("Message dispatch", function () {
    it("Message dispatch emits event", async function () {
      const encodedMessage = ethers.utils.formatBytes32String("Hi");
      console.log(encodedMessage)
      expect(await stargateOriginator.dispatchMessage(encodedMessage, wallet.getAddress()))
        .to.emit(stargateOriginator, 'DispatchMessage')
        .withArgs(encodedMessage, await deployer.getAddress(), await wallet.getAddress());

      console.log(await stargateOriginator.computeRoot());
    });
  });
});
