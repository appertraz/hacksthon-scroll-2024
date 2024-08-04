require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const { WALLET_PRIVATE_KEY, SCROLLSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    /**
     * https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
     */
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 3000000, // one per lot
          },
        },
      },
    ],
    overrides: {
      "contracts/MinterFactory.sol": {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 30, // one per company
          },
        },
      },
    },
  },
  /**
   * https://docs.scroll.io/en/developers/verifying-smart-contracts/
   * https://sepolia.scrollscan.com
   */
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: WALLET_PRIVATE_KEY !== undefined ? [WALLET_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCROLLSCAN_API_KEY,
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
};
