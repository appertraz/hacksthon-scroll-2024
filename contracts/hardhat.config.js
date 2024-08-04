require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const ARBITRUM_SEPOLIA_RPC_URL = "https://arb-sepolia.g.alchemy.com/v2/2YZy6xrTQngHbeUINCmc1vAL5qyGw9BP";
const WALLET_PRIVATE_KEY = "68308dd58f1678c483e59d256a147a6dced6bd417fbcbaa406130259ecac0c49";
const ARBISCAN_API_KEY = "1m6bCkuN_9J6QIOv6C2AIj-NjfH0G9we";

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
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC_URL,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: ARBISCAN_API_KEY,
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-testnet.arbiscan.io/api",
          browserURL: "https://testnet.arbiscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
