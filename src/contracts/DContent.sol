// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

contract DContent {
	uint256 public postCount = 0;
	string public name = "DPost";
	Post[] public Posts;

	struct Post {
		uint256 id;
		string title;
		string imagehash;
		string descriptions;
		bool isdelete;
		address author;
	}

	// abstract constructor() public {}

	function uploadPost(
		string memory _title,
		string memory _imageHash,
		string memory _descriptions
	) public {
		require(bytes(_title).length > 0);
		require(bytes(_descriptions).length > 0);
		require(bytes(_imageHash).length > 0);
		require(msg.sender != address(0));

		postCount++;
		Posts.push(
			Post(
				postCount,
				_title,
				_imageHash,
				_descriptions,
				false,
				msg.sender
			)
		);
	}

	function getPosts() public view returns (Post[] memory) {
		require(msg.sender != address(0));
		return Posts;
	}

	function getPost(uint256 post_id) public view returns (Post memory) {
		require(msg.sender != address(0));
		return Posts[post_id];
	}
}
