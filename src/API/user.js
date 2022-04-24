import { ConnectFind } from "./index";

const getCurrentUser = async () => {
	const users = await window.web3.eth.getAccounts();
	return users[0];
};

async function createUser({ d_connect, name, photo, bio, address, amount }) {
	const users = await d_connect.methods
		.createUser(name, photo, bio, amount)
		.send({ from: address });

	return true;
}

async function updateUser({ d_connect, name, photo, bio, address, amount }) {
	const users = await d_connect.methods
		.updateUser(name, photo, bio, amount)
		.send({ from: address });

	return true;
}

const getAllUsers = async ({ d_connect, address }) => {
	const users = await d_connect.methods.getUsers().call({ from: address });
	// console.log(users[0].name);
	return users;
};

const getUsersAmount = async ({ d_connect, address, user }) => {
	const users = await d_connect.methods
		.getAmount(user)
		.call({ from: address });
	// console.log(users[0].name);
	return users;
};

const getUser = async ({ d_connect, address, user }) => {
	const users = await d_connect.methods.getUser(user).call({ from: address });
	// console.log(users.photo);
	return users;
};

async function subscribedUser({ d_connect, address, user, amount }) {
	console.log(user);
	const users = await d_connect.methods.subscribedUser(user).send({
		from: address,
		value: window.web3.utils.toWei(amount.toString(), "ether"),
	});
	// console.log(users.photo);
	return users;
}

async function getMySubscriptionsList({ d_connect, address }) {
	// console.log(user);
	const users = await d_connect.methods
		.getMySubscriptions()
		.call({ from: address });
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
	getMySubscriptionsList,
	getUsersAmount,
};
