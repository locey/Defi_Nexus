require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();

module.exports = {
	solidity: {
		version: "0.8.28",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},
	networks: {
		hardhat: {},
		sepolia: {
			url: process.env.SEPOLIA_RPC_URL || '',
			accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
		}
	}
};
