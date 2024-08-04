const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

const { validAddress, getCompany } = require("./utils");

//
// FIXME probar la función Ownable.transferOwnership() en MinterFactory y Minter
//                         ERC721.balanceOf()
//                         ERC721.ownerOf
//                         ERC721URIStorage → ERC4906_INTERFACE_ID = bytes4(0x49064906);
//

describe("MinterFactory", function () {
  // ----------------------------------------------------------------------------- //

  async function deployFixture() {
    const [owner, addr1] = await ethers.getSigners();

    const MinterFactory = await ethers.getContractFactory("MinterFactory");
    const factory = await MinterFactory.deploy();

    return { factory, owner, addr1 };
  }

  async function createMinterFixture() {
    const { factory, owner, addr1 } = await loadFixture(deployFixture);
    const { companyId, companyName } = getCompany();

    const tx_unconfirmed = await factory.createMinter(companyId, companyName);
    const tx = await tx_unconfirmed.wait();

    const minterAddress = await factory.getContractAddress(companyId);

    return { factory, owner, addr1, companyId, companyName, tx, minterAddress };
  }

  // ----------------------------------------------------------------------------- //

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { factory, owner } = await loadFixture(deployFixture);
      expect(await factory.owner()).to.equal(owner.address);
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("createMinter()", function () {
    describe("Uses", function () {
      it("Should create minter contract", async function () {
        const { factory, owner, tx, minterAddress } = await loadFixture(createMinterFixture);
        expect(await tx.to).to.equal(factory.target);
        expect(await tx.from).to.equal(owner.address);
        expect(ethers.isAddress(minterAddress)).to.equal(true);
      });
    });

    // -------------------------------- //

    describe("Events", function () {
      it("Should issue two events", async function () {
        const { tx } = await loadFixture(createMinterFixture);
        expect(await tx.logs.length).to.equal(2);
      });

      it("Should issue OwnershipTransferred", async function () {
        // Transaction is used for this event because the change of ownership
        // occurs in another contract, not in MinterFactory
        const { owner, tx } = await loadFixture(createMinterFixture);
        const zeroAddress = ethers.ZeroAddress;
        /**
         * MinterFactory.createMinter
         * Minter.constructor
         * Ownable.constructor
         * Ownable._transferOwnership
         * emit OwnershipTransferred(oldOwner, newOwner)
         */
        const log = tx.logs[0];
        expect(log.fragment.type).to.equal("event");
        expect(log.fragment.name).to.equal("OwnershipTransferred");
        expect(log.args[0]).to.equal(zeroAddress);
        expect(log.args[1]).to.equal(owner.address);
      });

      it("Should issue NewMinterContract", async function () {
        const { factory } = await loadFixture(deployFixture);
        const { companyId, companyName } = getCompany();
        /**
         * MinterFactory.createMinter
         * emit NewMinterContract(companyId, contractAddress)
         */
        await expect(factory.createMinter(companyId, companyName))
          .to.emit(factory, "NewMinterContract")
          .withArgs(companyId, validAddress);
      });
    });

    // -------------------------------- //

    describe("Errors", function () {
      it("Should not allow add the same companyId", async function () {
        const { factory, companyId, companyName } = await loadFixture(createMinterFixture);
        await expect(factory.createMinter(companyId, companyName)).to.revertedWithCustomError(
          factory,
          "CompanyIdAlreadyExists"
        );
      });

      it("Should only the owner be authorized to use createMinter", async function () {
        const { factory, addr1 } = await loadFixture(deployFixture);
        const { companyId, companyName } = getCompany();
        await expect(factory.connect(addr1).createMinter(companyId, companyName))
          .to.revertedWithCustomError(factory, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("getContractAddress()", function () {
    describe("Uses", function () {
      it("Should return the contract address", async function () {
        const { minterAddress } = await loadFixture(createMinterFixture);
        expect(ethers.isAddress(minterAddress)).to.equal(true);
      });
    });

    describe("Errors", function () {
      it("Should only the owner be authorized to use it", async function () {
        const { factory, addr1, companyId } = await loadFixture(createMinterFixture);
        await expect(factory.connect(addr1).getContractAddress(companyId))
          .to.revertedWithCustomError(factory, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("forgetContractAddress()", function () {
    describe("Uses", function () {
      it("Should be possible to add a company after forgetting it", async function () {
        const { factory, companyId, companyName, minterAddress } = await loadFixture(createMinterFixture);
        await (await factory.forgetContractAddress(companyId)).wait();
        await (await factory.createMinter(companyId, companyName)).wait();
        const newMinterAddress = await factory.getContractAddress(companyId);
        expect(minterAddress).to.not.equal(newMinterAddress);
      });
    });

    describe("Events", function () {
      it("Should issue ForgetMinterContract event", async function () {
        const { factory, companyId } = await loadFixture(createMinterFixture);
        await expect(factory.forgetContractAddress(companyId))
          .to.emit(factory, "ForgetMinterContract")
          .withArgs(companyId, validAddress);
      });
    });

    describe("Errors", function () {
      it("Should only the owner be authorized to use it", async function () {
        const { factory, addr1, companyId } = await loadFixture(createMinterFixture);
        await expect(factory.connect(addr1).forgetContractAddress(companyId))
          .to.revertedWithCustomError(factory, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });

      it("Should not be possible to forget if there is no contract.", async function () {
        const { factory } = await loadFixture(createMinterFixture);
        await expect(factory.forgetContractAddress(999999999)).to.revertedWithCustomError(
          factory,
          "NonExistMinterContract"
        );
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("getOldContractAddress()", function () {
    describe("Uses", function () {
      it("Should be allowed for owner to use it", async function () {
        const { factory, companyId } = await loadFixture(createMinterFixture);
        const oldAddresses = await factory.getOldContractAddress(companyId);
        expect(oldAddresses).to.eql([]);
      });

      it("Should return the old address if forgotten", async function () {
        const { factory, companyId, minterAddress } = await loadFixture(createMinterFixture);
        await (await factory.forgetContractAddress(companyId)).wait();
        const oldAddresses1 = await factory.getOldContractAddress(companyId);
        expect(oldAddresses1).to.eql([minterAddress]);
      });

      it("Should return all old addresses in order if forgotten", async function () {
        const { factory, companyId, minterAddress } = await loadFixture(createMinterFixture);
        const { companyName } = getCompany(); // a new name is ok

        await (await factory.forgetContractAddress(companyId)).wait();
        const oldAddresses1 = await factory.getOldContractAddress(companyId);
        expect(oldAddresses1).to.eql([minterAddress]);

        (await factory.createMinter(companyId, companyName)).wait();
        const newMinterAddress = await factory.getContractAddress(companyId);
        const oldAddresses2 = await factory.getOldContractAddress(companyId);
        expect(oldAddresses2).to.eql([minterAddress]); // unchanged

        await (await factory.forgetContractAddress(companyId)).wait();
        const oldAddresses3 = await factory.getOldContractAddress(companyId);
        expect(oldAddresses3).to.eql([minterAddress, newMinterAddress]);
      });
    });

    describe("Errors", function () {
      it("Should only the owner be authorized to use it", async function () {
        const { factory, addr1, companyId } = await loadFixture(createMinterFixture);
        await expect(factory.connect(addr1).getOldContractAddress(companyId))
          .to.revertedWithCustomError(factory, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //
});
