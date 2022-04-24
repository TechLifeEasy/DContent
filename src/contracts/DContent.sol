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
		uint256 id;
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
	uint256 public post_counter = 0;

	// Network
	mapping(address => mapping(address => bool)) public followers;
	mapping(address => mapping(address => bool)) public following;
	mapping(address => Network) public networks;

	mapping(address => mapping(uint256 => Post_data)) public posts;
	mapping(address => mapping(uint256 => Post_data)) internal private_posts;
	mapping(address => mapping(address => bool)) internal subscribed;
	mapping(address => uint256) public amount;

	mapping(address => uint256[]) public post_id;
	mapping(address => uint256[]) internal private_id;

	event UserUpdated(string name, string photo, string bio);

	event PostUpdated(string hash, string title, string caption, uint256 likes);

	function createUser(
		string memory _name,
		string memory photo,
		string memory bio,
		uint256 _amount
	) public {
		require(msg.sender != address(0));
		require(!isUser[msg.sender]);
		User memory user = User(msg.sender, _name, photo, bio);
		subscribed[msg.sender][msg.sender] = true;
		users[msg.sender] = user;
		user_id.push(msg.sender);
		isUser[msg.sender] = true;
		networks[msg.sender] = Network(0, 0);
		amount[msg.sender] = _amount;
		emit UserUpdated(_name, photo, bio);
	}

	function getUsers() public view returns (address[] memory) {
		require(msg.sender != address(0));
		// if (user_id.length == 0) return new User[](0);
		// User[] memory data = new User[](user_id.length);
		// for (uint256 i = 0; i < user_id.length; i++) {
		// 	data[i] = users[user_id[i]];
		// }
		return user_id;
	}

	function getUser(address user) public view returns (User memory) {
		require(msg.sender != address(0));
		require(isUser[user]);
		return users[user];
	}

	function getAmount(address user) public view returns (uint256) {
		require(msg.sender != address(0));
		require(isUser[user]);
		return amount[user];
	}

	function updateUser(
		string memory _name,
		string memory photo,
		string memory bio,
		uint256 _amount
	) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		User memory user = User(msg.sender, _name, photo, bio);
		users[msg.sender] = user;
		if (_amount != 0) {
			amount[msg.sender] = _amount;
		}
		emit UserUpdated(_name, photo, bio);
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
		string memory title,
		string memory hash,
		string memory caption
	) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		Post_data memory post = Post_data(
			post_counter,
			msg.sender,
			hash,
			title,
			caption,
			0
		);
		posts[msg.sender][post_counter] = post;
		post_id[msg.sender].push(post_counter);
		post_counter++;
		emit PostUpdated(hash, post.title, post.caption, post.likes);
	}

	function createPrivatePost(
		string memory title,
		string memory hash,
		string memory caption
	) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		Post_data memory post = Post_data(
			post_counter,
			msg.sender,
			hash,
			title,
			caption,
			0
		);
		private_posts[msg.sender][post_counter] = post;
		private_id[msg.sender].push(post_counter);
		post_counter++;
		emit PostUpdated(hash, post.title, post.caption, post.likes);
	}

	// function sendBal(address payable receiver) external payable onlyOwner {
	// 	uint256 amount = msg.value;
	// 	receiver.transfer(amount);
	// }

	function subscribedUser(address payable receiver) external payable {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		require(isUser[receiver]);

		receiver.transfer(msg.value);

		// do money trantions
		subscribed[receiver][msg.sender] = true;
	}

	function updatePost(
		string memory title,
		string memory hash,
		string memory caption,
		uint256 id
	) public {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		Post_data memory post = Post_data(
			id,
			msg.sender,
			hash,
			title,
			caption,
			posts[msg.sender][id].likes
		);
		posts[msg.sender][id] = post;
		emit PostUpdated(hash, post.title, post.caption, post.likes);
	}

	function getMySubscriptions() public view returns (address[] memory) {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);

		uint256 count = 0;
		for (uint256 i = 0; i < user_id.length; i++) {
			if (subscribed[user_id[i]][msg.sender]) {
				count++;
			}
		}

		address[] memory user = new address[](count);
		count = 0;
		for (uint256 i = 0; i < user_id.length; i++) {
			if (subscribed[user_id[i]][msg.sender]) {
				user[count] = user_id[i];
				count++;
			}
		}
		return user;
	}

	function getPosts() public view returns (Post_data[] memory) {
		require(msg.sender != address(0));
		require(isUser[msg.sender]);
		uint256[] memory ids = post_id[msg.sender];
		Post_data[] memory retrieval = new Post_data[](ids.length);
		for (uint256 i = 0; i < ids.length; i++) {
			retrieval[i] = posts[msg.sender][ids[i]];
		}
		return retrieval;
	}

	function getPosts(address user) public view returns (Post_data[] memory) {
		require(user != address(0));
		require(isUser[user]);
		uint256[] memory ids = post_id[user];
		Post_data[] memory retrieval = new Post_data[](ids.length);
		for (uint256 i = 0; i < ids.length; i++) {
			retrieval[i] = posts[user][ids[i]];
		}
		return retrieval;
	}

	function getPrivatePosts(address user)
		public
		view
		returns (Post_data[] memory)
	{
		require(user != address(0));
		require(isUser[user]);
		require(subscribed[user][msg.sender]);

		uint256[] memory ids = private_id[user];
		Post_data[] memory retrieval = new Post_data[](ids.length);
		for (uint256 i = 0; i < ids.length; i++) {
			retrieval[i] = private_posts[user][ids[i]];
		}
		return retrieval;
	}

	function getAllPosts() public view returns (Post_data[] memory) {
		require(msg.sender != address(0));
		if (user_id.length == 0) return new Post_data[](0);
		Post_data[] memory all_posts = getPosts(user_id[0]);
		for (uint256 i = 1; i < user_id.length; i++) {
			Post_data[] memory user_id_posts = getPosts(user_id[i]);
			Post_data[] memory temp = new Post_data[](
				all_posts.length + user_id_posts.length
			);
			for (uint256 j = 0; j < all_posts.length; j++) {
				temp[j] = all_posts[j];
			}
			for (uint256 j = 0; j < user_id_posts.length; j++) {
				temp[all_posts.length + j] = user_id_posts[j];
			}
			all_posts = temp;
		}

		return all_posts;
	}
}
