export const getAllProjects = async ({ d_connect, address }) => {
	console.log(address);
	const posts = await d_connect.methods.getAllPosts().call({ from: address });
	console.log(posts);
	return posts;
};

export const getMyPosts = async ({ d_connect, address }) => {
	console.log(address);
	const posts = await d_connect.methods.getPosts().call({ from: address });
	console.log(posts);
	return posts;
};

export const getUserPosts = async ({ d_connect, address, user }) => {
	console.log(address);
	const posts = await d_connect.methods
		.getPosts(user)
		.call({ from: address });
	console.log(posts);
	return posts;
};

export const getUserPrivatePosts = async ({ d_connect, address, user }) => {
	console.log(address);
	const posts = await d_connect.methods
		.getPrivatePosts(user)
		.call({ from: address });
	console.log(posts);
	return posts;
};

export const createPost = async ({
	d_connect,
	title,
	photo,
	caption,
	address,
}) => {
	const post = await d_connect.methods
		.createPost(title, photo, caption)
		.send({ from: address });

	return true;
};

export const createPrivatePost = async ({
	d_connect,
	title,
	photo,
	caption,
	address,
}) => {
	const post = await d_connect.methods
		.createPrivatePost(title, photo, caption)
		.send({ from: address });

	return true;
};

export const updatePost = async ({
	d_connect,
	title,
	photo,
	caption,
	address,
	id,
}) => {
	console.log(d_connect);
	const post = await d_connect.methods
		.updatePost(title, photo, caption, id)
		.send({ from: address });

	return true;
};
