async function getAllProjects({ d_connect, address }) {
	console.log(address);
	const posts = await d_connect.methods.getAllPosts().call({ from: address });
	console.log(posts);
	return posts;
}

async function getMyPosts({ d_connect, address }) {
	console.log(address);
	const posts = await d_connect.methods.getPosts().call({ from: address });
	console.log(posts);
	return posts;
}

async function getUserPosts({ d_connect, address, user }) {
	console.log(address);
	const posts = await d_connect.methods
		.getPosts(user)
		.call({ from: address });
	console.log(posts);
	return posts;
}

async function getUserPrivatePosts({ d_connect, address, user }) {
	console.log(address);
	const posts = await d_connect.methods
		.getPrivatePosts(user)
		.call({ from: address });
	console.log(posts);
	return posts;
}

async function createPost({ d_connect, title, photo, caption, address }) {
	const post = await d_connect.methods
		.createPost(title, photo, caption)
		.send({ from: address });

	return true;
}

async function createPrivatePost({
	d_connect,
	title,
	photo,
	caption,
	address,
}) {
	const post = await d_connect.methods
		.createPrivatePost(title, photo, caption)
		.send({ from: address });

	return true;
}

async function updatePost({ d_connect, title, photo, caption, address, id }) {
	console.log(d_connect);
	const post = await d_connect.methods
		.updatePost(title, photo, caption, id)
		.send({ from: address });

	return true;
}

export {
	createPost,
	getAllProjects,
	getMyPosts,
	getUserPosts,
	updatePost,
	getUserPrivatePosts,
	createPrivatePost,
};
