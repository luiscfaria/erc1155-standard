const hre = require("hardhat");

async function main() {
  let ERC1155 = await ethers.getContractFactory("ERC1155");
  ERC1155 = await ERC1155.deploy();

  await ERC1155.deployed();
  console.log("ERC1155 Contract deployed to:", ERC1155.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});