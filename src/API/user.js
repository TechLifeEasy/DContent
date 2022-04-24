import { ConnectFind } from "./index";

export const getCurrentUser = async () => {
	const users = await window.web3.eth.getAccounts();
	return users[0];
};

export const createUser = async ({ d_connect, name, photo, bio, address }) => {
	const users = await d_connect.methods
		.createUser(name, photo, bio)
		.send({ from: address });

	return true;
};

export const updateUser = async ({ d_connect, name, photo, bio, address }) => {
	const users = await d_connect.methods
		.updateUser(name, photo, bio)
		.send({ from: address });

	return true;
};

export const getAllUsers = async ({ d_connect, address }) => {
	const users = await d_connect.methods.getUsers().call({ from: address });
	// console.log(users[0].name);
	return users;
};

export const getUser = async ({ d_connect, address, user }) => {
	const users = await d_connect.methods.getUser(user).call({ from: address });
	// console.log(users.photo);
	return users;
};

export const subscribedUser = async ({ d_connect, address, user }) => {
	console.log(user);
	const users = await d_connect.methods
		.subscribedUser(user)
		.send({ from: address });
	// console.log(users.photo);
	return users;
};
