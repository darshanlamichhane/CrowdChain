/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "goerli",
    networks: {
      hardhat: {},
      goerli: {
        url: "https://rpc.ankr.com/eth_goerli",
        accounts: [
          `4ec501b1e30048256c8716986bb69f6ae7cc00565ec5d566bc7eb17c4924e0d9`,
        ],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
