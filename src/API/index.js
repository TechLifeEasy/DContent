import Web3 from "web3";
import DContent from "../abis/DContent.json";

async function loadWeb3() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	} else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider);
	} else {
		window.alert(
			"Non-Ethereum browser detected. You should consider trying MetaMask!"
		);
	}
}

async function ConnectFind() {
	const networkId = await window.web3.eth.net.getId();
	const networkData = DContent.networks[networkId];

	if (networkData) {
		const d_content = new window.web3.eth.Contract(
			DContent.abi,
			networkData.address
		);
		return d_content;
	}

	return new Error("Network not found");
}

export { loadWeb3, ConnectFind };
