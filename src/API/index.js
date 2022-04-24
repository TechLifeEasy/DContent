import Web3 from "web3";
import DContent from "../abis/DContent.json";
//Declare IPFS
import { create } from "ipfs-http-client";

export const loadWeb3 = async () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.eth_requestAccounts;
	} else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider);
	} else {
		window.alert(
			"Non-Ethereum browser detected. You should consider trying MetaMask!"
		);
	}
};

export const ConnectFind = async () => {
	const networkId = await window.web3.eth.net.getId();
	const networkData = DContent.networks[networkId];

	if (networkData) {
		const dContent = new window.web3.eth.Contract(
			DContent.abi,
			networkData.address
		);
		return dContent;
	}

	return new Error("Network not found");
};

export const UploadImage = async (buffer) => {
	const ipfs = create({
		host: "ipfs.infura.io",
		port: 5001,
		protocol: "https",
	}); // leaving out the arguments will default to these values

	const id = await ipfs.add(buffer);

	console.log(id);

	return id;
};
