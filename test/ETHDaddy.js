const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe } = require("mocha");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("ETHDaddy", () => {
  let ethDaddy;
  let deployer, owner1;

  const name = "ETH Daddy";
  const symbol = "ETHD";

  beforeEach(async () => {
    // Setup accounts
    [deployer, owner1] = await ethers.getSigners();

    // Deploy smart contract
    const ETHDaddy = await ethers.getContractFactory("ETHDaddy");
    ethDaddy = await ETHDaddy.deploy(name, symbol);

    // List a domain
    const transaction = await ethDaddy
      .connect(deployer)
      .list("jack.eth", tokens(10));
    await transaction.wait();
  });

  describe("Test constructor!", () => {
    it("Has a name", async () => {
      const result = await ethDaddy.name();
      expect(result).to.be.equal(name);
    });

    it("Has a symbol", async () => {
      const result = await ethDaddy.symbol();
      expect(result).to.be.equal(symbol);
    });
    it("Sets the owner", async () => {
      const result = await ethDaddy.owner();
      expect(result).to.be.equal(deployer.address);
    });
  });

  describe("Test domain!", () => {
    it("Returns domain address", async () => {
      let domain = await ethDaddy.domains(1);
      expect(domain.name).to.be.equal("jack.eth");
    });
  });
});
