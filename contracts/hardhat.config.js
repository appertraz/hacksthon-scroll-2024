require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */

const ARBITRUM_SEPOLIA_RPC_URL = "https://arb-sepolia.g.alchemy.com/v2/2YZy6xrTQngHbeUINCmc1vAL5qyGw9BP";
const WALLET_PRIVATE_KEY = "68308dd58f1678c483e59d256a147a6dced6bd417fbcbaa406130259ecac0c49";
const ARBISCAN_API_KEY = "1m6bCkuN_9J6QIOv6C2AIj-NjfH0G9we";

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "arbitrumSepolia",
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
        chainId: 421613,
        urls: {
          apiURL: "https://api-testnet.arbiscan.io/api",
          browserURL: "https://testnet.arbiscan.io",
        },
      },
    ],
  },
};
