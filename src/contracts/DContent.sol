// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title User
 * @dev Implements decentralised content creation on Blockchain
 */
contract DeContent {

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
        uint likes;
    }

    struct Network {
        uint num_followers;
        uint num_following;
    }

    mapping(address => User) public users;
    mapping(address => bool) public isUser;
    address[] public user_id;

    mapping(address => mapping(address => bool)) public followers;
    mapping(address => mapping(address => bool)) public following;
    mapping(address => Network) public networks;

    mapping(address => mapping(string => Post_data)) public posts;
    mapping(address => string[]) public post_id;

    event UserUpdated(
        string name,
        string photo,
        string bio
    );
    
    event PostUpdated(
        string hash,
        string title,
        string caption,
        uint likes
    );

    function createUser(string calldata _name, string calldata photo, string calldata bio) public {
        require(msg.sender != address(0));
        require(!isUser[msg.sender]);
        User memory user = User(msg.sender, _name, photo, bio);
        users[msg.sender] = user;
        user_id.push(msg.sender);
        isUser[msg.sender] = true;
        networks[msg.sender] = Network(0, 0);
        emit UserUpdated(_name, photo, bio);
    }

    function getUsers() view public returns(address[] memory) {
        require(msg.sender != address(0));
        return user_id;
    }

    function getName() external view returns(string memory) {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        return users[msg.sender].name;
    } 

    function getPhoto() public view returns(string memory) {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        return users[msg.sender].photo;
    }

    function getBio() public view returns(string memory) {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        return users[msg.sender].bio;
    }

    function setName(string calldata newName) public {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        users[msg.sender].name = newName;
        emit UserUpdated(users[msg.sender].name, users[msg.sender].photo, users[msg.sender].bio);
    } 

    function setPhoto(string calldata newPhoto) public {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        users[msg.sender].photo = newPhoto;
        emit UserUpdated(users[msg.sender].name, users[msg.sender].photo, users[msg.sender].bio);
    }

    function setBio(string calldata newBio) public {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        users[msg.sender].bio = newBio;
        emit UserUpdated(users[msg.sender].name, users[msg.sender].photo, users[msg.sender].bio);
    }


    function follow(address user) public {
        require(msg.sender != address(0)); 
        require(user != address(0)); 
        require(isUser[msg.sender]);
        require(isUser[user]);
        if(!followers[user][msg.sender]) {
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
        if(followers[user][msg.sender]) {
            followers[user][msg.sender] = false;
            following[msg.sender][user] = false;
            networks[user].num_followers -= 1;
            networks[msg.sender].num_following -= 1;
        }
    }


    function createPost(string calldata id, string calldata hash, string calldata title, string calldata caption) public {
        require(msg.sender != address(0));
        require(isUser[msg.sender]);
        Post_data memory post = Post_data(msg.sender, hash, title, caption, 0);
        posts[msg.sender][id] = post;
        post_id[msg.sender].push(id);
        emit PostUpdated(hash, post.title, post.caption, post.likes);
    }

    function getPosts(address user) view public returns(Post_data[] memory) {
        require(user != address(0));
        require(isUser[user]);
        string[] memory ids = post_id[user];
        Post_data[] memory retrieval = new Post_data[](ids.length);
        for(uint i=0; i<ids.length; i++) {
            retrieval[i] = posts[msg.sender][ids[i]];
        }
        return retrieval;
    }

    function getAllPosts() view public returns(Post_data[] memory) {
        
    }

}
