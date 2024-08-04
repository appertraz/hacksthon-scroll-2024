const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

const { genWord, getInterfaceId, getCompany } = require("./utils");

/**
 * https://hardhat.org/hardhat-runner/docs/guides/test-contracts
 * https://hardhat.org/hardhat-chai-matchers/docs/reference
 * https://docs.ethers.org/v6/single-page
 *
 * read-only tx  https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call
 * read-write tx https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction
 */

describe("Minter", function () {
  // ----------------------------------------------------------------------------- //

  async function deployFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const { companyId, companyName } = getCompany();
    const uri = "ipfs://QmdGNAXvmGq9C5sn5Th4c8QAPS1VMvZ5GhHzJvKfGDmEKM";

    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(owner.address, companyId, companyName);

    return { minter, owner, addr1, companyId, companyName, uri };
  }

  async function mintFixture() {
    const { minter, owner, addr1, uri } = await loadFixture(deployFixture);

    const tx_unconfirmed = await minter.mint(uri);
    const tx = await tx_unconfirmed.wait();

    const tokenId = 1; // first token minted has id 1

    return { minter, owner, addr1, uri, tokenId, tx };
  }

  // ----------------------------------------------------------------------------- //

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { minter, owner } = await loadFixture(deployFixture);
      expect(await minter.owner()).to.equal(owner.address);
    });

    it("Should set the right token name", async function () {
      const { minter, companyName } = await loadFixture(deployFixture);
      expect(await minter.name()).to.equal(companyName);
    });

    it("Should set the right token symbol", async function () {
      const { minter } = await loadFixture(deployFixture);
      expect(await minter.symbol()).to.equal("Aper");
    });

    it("Should set the right company id", async function () {
      const { minter, companyId } = await loadFixture(deployFixture);
      expect(await minter.getCompanyId()).to.equal(companyId);
    });

    it("Should set the right company name", async function () {
      const { minter, companyName } = await loadFixture(deployFixture);
      expect(await minter.getCompanyName()).to.equal(companyName);
    });

    it("Should set the right last token id", async function () {
      const { minter } = await loadFixture(deployFixture);
      const lastTokenId = 0; // default value (initial)
      expect(await minter.getLastTokenId()).to.equal(lastTokenId);
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("Minting", function () {
    describe("Uses", function () {
      it("Should create the NFT", async function () {
        const { minter, owner, tx } = await loadFixture(mintFixture);
        expect(await tx.to).to.equal(minter.target);
        expect(await tx.from).to.equal(owner.address);
      });

      it("Should be allowed for owner to access the token URI", async function () {
        const { minter, owner, uri, tokenId } = await loadFixture(mintFixture);
        expect(await minter.connect(owner).tokenURI(tokenId)).to.equal(uri);
      });

      it("Should be allowed for users to access the token URI", async function () {
        const { minter, addr1, uri, tokenId } = await loadFixture(mintFixture);
        expect(await minter.connect(addr1).tokenURI(tokenId)).to.equal(uri);
      });

      it("Should be consecutive tokenId in 20 NFTs", async function () {
        const { minter } = await loadFixture(deployFixture);
        // Mint 20 NFT, checks the consecutiveness of the IDs
        // and also serves to compare gas usage
        const data = [];
        for (let i = 1; i < 21; i++) {
          data.push({ tokenId: i, tokenUri: genWord(59) });
        }
        for (const obj of data) {
          const { tokenId, tokenUri } = obj;
          await (await minter.mint(tokenUri)).wait();
          expect(await minter.tokenURI(tokenId)).to.equal(tokenUri);
        }
      });
    });

    // -------------------------------- //

    describe("Events", function () {
      it("Should issue three events", async function () {
        const { tx } = await loadFixture(mintFixture);
        expect(await tx.logs.length).to.equal(3);
      });

      it("Should issue Transfer", async function () {
        const { minter, owner, uri } = await loadFixture(deployFixture);
        const zeroAddress = ethers.ZeroAddress;
        const tokenId = 1;
        /**
         * Minter.mint
         * ERC721._safeMint
         * ERC721._mint
         * ERC721._update
         * emit Transfer(from, to, tokenId)
         */
        await expect(minter.mint(uri))
          .to.emit(minter, "Transfer")
          .withArgs(zeroAddress, owner.address, tokenId);
      });

      it("Should issue MetadataUpdate", async function () {
        const { minter, uri } = await loadFixture(deployFixture);
        const tokenId = 1;
        /**
         * Minter.mint
         * ERC721URIStorage._setTokenURI
         * emit MetadataUpdate(tokenId)
         */
        await expect(minter.mint(uri)).to.emit(minter, "MetadataUpdate").withArgs(tokenId);
      });

      it("Should issue NewNFT", async function () {
        const { minter, uri } = await loadFixture(deployFixture);
        const tokenId = 1;
        /**
         * Minter.mint
         * emit NewNFT(tokenId, uri)
         */
        await expect(minter.mint(uri)).to.emit(minter, "NewNFT").withArgs(tokenId, uri);
      });
    });

    // -------------------------------- //

    describe("Errors", function () {
      it("Should only the owner be authorized to mint", async function () {
        const { minter, addr1, uri } = await loadFixture(deployFixture);
        await expect(minter.connect(addr1).mint(uri))
          .to.revertedWithCustomError(minter, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("getCompanyId()", function () {
    describe("Uses", function () {
      it("Should be allowed for owner to use it", async function () {
        const { minter, companyId } = await loadFixture(deployFixture);
        expect(await minter.getCompanyId()).to.equal(companyId);
      });
    });

    describe("Errors", function () {
      it("Should only the owner be authorized to use it", async function () {
        const { minter, addr1 } = await loadFixture(deployFixture);
        await expect(minter.connect(addr1).getCompanyId())
          .to.revertedWithCustomError(minter, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("getCompanyName()", function () {
    describe("Uses", function () {
      it("Should be allowed for owner to use it", async function () {
        const { minter, companyName } = await loadFixture(deployFixture);
        expect(await minter.getCompanyName()).to.equal(companyName);
      });
    });

    describe("Errors", function () {
      it("Should only the owner be authorized to use it", async function () {
        const { minter, addr1 } = await loadFixture(deployFixture);
        await expect(minter.connect(addr1).getCompanyName())
          .to.revertedWithCustomError(minter, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("getLastTokenId()", function () {
    describe("Uses", function () {
      it("Should be allowed for owner to use it", async function () {
        const { minter } = await loadFixture(mintFixture);
        expect(await minter.getLastTokenId()).to.equal(1);
      });
    });

    describe("Errors", function () {
      it("Should only the owner be authorized to use it", async function () {
        const { minter, addr1 } = await loadFixture(deployFixture);
        await expect(minter.connect(addr1).getLastTokenId())
          .to.revertedWithCustomError(minter, "OwnableUnauthorizedAccount")
          .withArgs(addr1.address);
      });
    });
  });

  // ----------------------------------------------------------------------------- //

  describe("supportsInterface()", function () {
    describe("Uses", function () {
      it("Should support ERC165 interface", async function () {
        const { minter } = await loadFixture(deployFixture);
        // const id = "0x01ffc9a7"; // https://eips.ethereum.org/EIPS/eip-165
        const id = getInterfaceId("supportsInterface(bytes4)");
        expect(await minter.supportsInterface(id)).to.equal(true);
      });

      it("Should support ERC721 interface", async function () {
        const { minter } = await loadFixture(deployFixture);
        const id = "0x80ac58cd"; // https://eips.ethereum.org/EIPS/eip-721
        expect(await minter.supportsInterface(id)).to.equal(true);
      });

      it("Should support ERC721Metadata interface", async function () {
        const { minter } = await loadFixture(deployFixture);
        const id = "0x5b5e139f"; // https://eips.ethereum.org/EIPS/eip-721
        expect(await minter.supportsInterface(id)).to.equal(true);
      });
    });

    describe("Errors", function () {
      it("Should not support ERC721Enumerable interface", async function () {
        const { minter } = await loadFixture(deployFixture);
        const id = "0x780e9d63"; // https://eips.ethereum.org/EIPS/eip-721
        expect(await minter.supportsInterface(id)).to.equal(false);
      });

      it("Should not support interface id 0x00000000", async function () {
        const { minter } = await loadFixture(deployFixture);
        const id = "0x00000000";
        expect(await minter.supportsInterface(id)).to.equal(false);
      });

      it("Should not support interface id 0xffffffff", async function () {
        const { minter } = await loadFixture(deployFixture);
        const id = "0xffffffff";
        expect(await minter.supportsInterface(id)).to.equal(false);
      });
    });
  });

  // ----------------------------------------------------------------------------- //
});
