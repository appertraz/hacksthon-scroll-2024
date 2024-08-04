require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ARBITRUM_SEPOLIA_RPC_URL ="https://arb-sepolia.g.alchemy.com/v2/2YZy6xrTQngHbeUINCmc1vAL5qyGw9BP";
const WALLET_PRIVATE_KEY="68308dd58f1678c483e59d256a147a6dced6bd417fbcbaa406130259ecac0c49";
  
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
};