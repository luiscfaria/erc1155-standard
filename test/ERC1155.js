const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Faria Token", function () {
  let FariaToken;
  let users, owner, addr1, addr2;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
    addr3 = users[3];
  });

  describe("Deployment", function () {
    it("Should Deploy Contract", async function () {
      FariaToken = await ethers.getContractFactory("FariaToken");
      FariaToken = await FariaToken.deploy();
      await FariaToken.deployed();
    });

    it("Should Mint as Minter", async function () {
      FariaToken = await ethers.getContractFactory("FariaToken");
      FariaToken = await FariaToken.deploy();
      await FariaToken.deployed();

      expect(FariaToken.mint(addr1.address, 1, 1, ""));
    });
  });
});
