import { Contract } from "ethers";

const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Faria Token", function () {
  let FariaToken: Contract;
  let users, owner, addr1, addr2;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
  });

  beforeEach(async () => {
    FariaToken = await ethers.getContractFactory("FariaToken");
    FariaToken = await FariaToken.deploy();
    await FariaToken.deployed();
  });

  describe("Deployment", function () {
    it("Should setURI as URI Setter", async function () {
      await expect(FariaToken.setURI("baseURI")).not.to.be.reverted;
    });

    it("Should not setURI if not URI Setter", async function () {
      await expect(FariaToken.connect(addr1).setURI("baseURI")).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x7804d923f43a17d325d77e781528e0793b2edd9890ab45fc64efd7b4b427744c"
      );
    });

    it("Should Mint as Minter", async function () {
      await expect(FariaToken.mint(addr1.address, 1, 1, "0x")).not.to.be.reverted;
    });

    it("Should Revert if not Minter", async function () {
      await expect(
        FariaToken.connect(addr1).mint(addr2.address, 1, 1, "0x")
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
      );
    });

    it("Should MintBatch as Minter", async function () {
      const ids = [1, 2, 3];
      const amounts = [2, 2, 3]
      await expect(FariaToken.mintBatch(addr1.address, ids, amounts, "0x")).not.to.be.reverted;
    });

    it("Should Revert if not Minter", async function () {
      const ids = [1, 2, 3];
      const amounts = [2, 2, 3]
      await expect(
        FariaToken.connect(addr1).mint(addr2.address, ids, amounts, "0x")
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
      );
    });
  });
});
