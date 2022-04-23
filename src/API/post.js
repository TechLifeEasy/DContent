async function getAllProjects({ d_connect, address }) {
	console.log(address);
	const posts = await d_connect.methods.getAllPosts().call({ from: address });
	console.log(posts);
	return posts;
}

export { getAllProjects };
