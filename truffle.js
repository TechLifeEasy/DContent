require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
	networks: {
		matic: {
			provider: () =>
				new HDWalletProvider(
					process.env.MNEMONIC,
					`https://rpc-mumbai.matic.today`
				),
			network_id: 80001,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: true,
			gas: 6000000,
			gasPrice: 10000000000,
		},
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "5777", // Match any network id
		},
		ropsten: {},
	},
	contracts_directory: "./src/contracts/",
	contracts_build_directory: "./src/abis/",
	compilers: {
		solc: {
			version: "^0.8.0",
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
