const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleWallet", function () {
  async function deploySimpleWalletFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const SimpleWallet = await ethers.getContractFactory("SimpleWallet");
    const simpleWallet = await SimpleWallet.deploy();
    return { simpleWallet, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should set the correct owner", async function () {
      const { simpleWallet, owner } = await loadFixture(
        deploySimpleWalletFixture
      );
      expect(await simpleWallet.owner()).to.equal(owner.address);
    });
  });

  describe("Withdrawals", function () {
    it("Should allow sending Ether to the contract", async function () {
        const { simpleWallet, owner } = await loadFixture(
          deploySimpleWalletFixture
        );
      
        const initialBalance = await simpleWallet.getBalance();
        // const amountToSend = ethers.utils.parseEther("1");
        const amountToSend = '1000000000000000000';
      
        // Send Ether to the contract
        await owner.sendTransaction({
          to: simpleWallet.address,
          value: amountToSend,
        });
      
        const finalBalance = await simpleWallet.getBalance();
      
        expect(finalBalance).to.equal(initialBalance.add(amountToSend));
      });
      
      it("Should allow the owner to withdraw funds", async function () {
        const { simpleWallet, owner } = await loadFixture(
          deploySimpleWalletFixture
        );
      
        const initialBalance = await simpleWallet.getBalance();
        const amountToWithdraw = '1000000000000000000';

      
        // Call the withdraw function directly
        await simpleWallet.connect(owner).withdraw(amountToWithdraw);
      
        const finalBalance = await simpleWallet.getBalance();
      
        expect(finalBalance).to.equal(initialBalance.sub(amountToWithdraw));
      });
      
  });
});
