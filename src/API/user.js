import { ConnectFind } from "./index";

async function getCurrentUser() {
	const users = await window.web3.eth.getAccounts();
	return users[0];
}

async function createUser({ d_connect, name, photo, bio, address }) {
	const users = await d_connect.methods
		.createUser(name, photo, bio)
		.send({ from: address });

	return true;
}

async function updateUser({ d_connect, name, photo, bio, address }) {
	const users = await d_connect.methods
		.updateUser(name, photo, bio)
		.send({ from: address });

	return true;
}

async function getAllUsers({ d_connect, address }) {
	const users = await d_connect.methods.getUsers().call({ from: address });
	// console.log(users[0].name);
	return users;
}

async function getUser({ d_connect, address, user }) {
	console.log(user);
	const users = await d_connect.methods.getUser(user).call({ from: address });
	// console.log(users.photo);
	return users;
}

async function subscribedUser({ d_connect, address, user }) {
	console.log(user);
	const users = await d_connect.methods
		.subscribedUser(user)
		.send({ from: address });
	// console.log(users.photo);
	return users;
}

export {
	getCurrentUser,
	updateUser,
	getAllUsers,
	getUser,
	createUser,
	subscribedUser,
};
