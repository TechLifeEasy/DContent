// SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.5.0;
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title User
 * @dev Implements decentralised content creation on Blockchain
 */
contract DContent {
	struct User {
		address addr;
		string name;
		string photo;
		string bio;
	}

	struct Post_data {
		address owner;
		string hash;
		string title;
		string caption;
		uint256 likes;
	}

	struct Network {
		uint256 num_followers;
		uint256 num_following;
	}

	// Profile
	mapping(address => User) public users;
	mapping(address => bool) public isUser;
	address[] public user_id;

	// Network
	mapping(address => mapping(address => bool)) public followers;
	mapping(address => mapping(address => bool)) public following;
	mapping(address => Network) public networks;

	mapping(address => mapping(string => Post_data)) public posts;
	mapping(address => mapping(string => Post_data)) internal private_posts;
	mapping(address => string[]) public post_id;

	event UserUpdated(string name, string photo, string bio);

	event PostUpdated(string hash, string title, string caption, uint256 likes);

	function createUser(
		string memory _name,
		string memory photo,
		string memory bio
	) public {
		require(msg.sender != address(0));
		require(!isUser[msg.sender]);
		User memory user = User(msg.sender, _name, photo, bio);
		users[msg.sender] = user;
		user_id.push(msg.sender);
		isUser[msg.sender] = true;
		networks[msg.sender] = Network(0, 0);
		emit UserUpdated(_name, photo, bio);
	}

	function getUsers() public view returns (address[] memory) {
		require(msg.sender != address(0));
		return user_id;
	}

	function getUser(address user) public view returns (User memory) {
		require(msg.sender != address(0));
		require(!isUser[msg.sender]);
		return users[user];
	}

	function getName() external view returns (string memory) {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		return users[msg.sender].name;
	}

	function getPhoto() public view returns (string memory) {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		return users[msg.sender].photo;
	}

	function getBio() public view returns (string memory) {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		return users[msg.sender].bio;
	}

	function setName(string memory newName) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		users[msg.sender].name = newName;
		emit UserUpdated(
			users[msg.sender].name,
			users[msg.sender].photo,
			users[msg.sender].bio
		);
	}

	function setPhoto(string memory newPhoto) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		users[msg.sender].photo = newPhoto;
		emit UserUpdated(
			users[msg.sender].name,
			users[msg.sender].photo,
			users[msg.sender].bio
		);
	}

	function setBio(string memory newBio) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		users[msg.sender].bio = newBio;
		emit UserUpdated(
			users[msg.sender].name,
			users[msg.sender].photo,
			users[msg.sender].bio
		);
	}

	function follow(address user) public {
		require(msg.sender != address(0));
		require(user != address(0));
		require(isUser[msg.sender]);
		require(isUser[user]);
		if (!followers[user][msg.sender]) {
			followers[user][msg.sender] = true;
			following[msg.sender][user] = true;
			networks[user].num_followers += 1;
			networks[msg.sender].num_following += 1;
		}
	}

	function unfollow(address user) public {
		require(msg.sender != address(0));
		require(user != address(0));
		require(isUser[msg.sender]);
		require(isUser[user]);
		if (followers[user][msg.sender]) {
			followers[user][msg.sender] = false;
			following[msg.sender][user] = false;
			networks[user].num_followers -= 1;
			networks[msg.sender].num_following -= 1;
		}
	}

	function createPost(
		string memory id,
		string memory hash,
		string memory title,
		string memory caption
	) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		Post_data memory post = Post_data(msg.sender, hash, title, caption, 0);
		posts[msg.sender][id] = post;
		post_id[msg.sender].push(id);
		emit PostUpdated(hash, post.title, post.caption, post.likes);
	}

	function getPosts() public view returns (Post_data[] memory) {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		string[] memory ids = post_id[msg.sender];
		Post_data[] memory retrieval = new Post_data[](ids.length);
		for (uint256 i = 0; i < ids.length; i++) {
			retrieval[i] = posts[msg.sender][ids[i]];
		}
		return retrieval;
	}

	function getPosts(address user) public view returns (Post_data[] memory) {
		require(user != address(0));
		require(isUser[user]);
		string[] memory ids = post_id[user];
		Post_data[] memory retrieval = new Post_data[](ids.length);
		for (uint256 i = 0; i < ids.length; i++) {
			retrieval[i] = posts[user][ids[i]];
		}
		return retrieval;
	}

	function getAllPosts() public view returns (Post_data[] memory) {
		require(msg.sender != address(0));
		if (user_id.length == 0) return new Post_data[](0);
		Post_data[] memory all_posts = getPosts(user_id[0]);
		for (uint256 i = 0; i < user_id.length; i++) {
			Post_data[] memory user_id_posts = getPosts(user_id[i]);
			Post_data[] memory temp = new Post_data[](
				all_posts.length + user_id_posts.length
			);
			for (uint256 j = 0; j < all_posts.length; j++) {
				temp[j] = all_posts[j];
			}
			for (uint256 j = 0; j < user_id_posts.length; j++) {
				temp[j] = user_id_posts[all_posts.length + j];
			}
			all_posts = temp;
		}

		return all_posts;
	}
}
