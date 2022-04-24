import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import UpdatePost from "./UpdatePost";
import UserContext from "./UserContext";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { loadWeb3, UploadImage } from "../API/index";
import {
	getCurrentUser,
	updateUser,
	createUser,
	getAllUsers,
	getUser,
	subscribedUser,
	getMySubscriptionsList,
} from "../API/user";
import {
	createPost,
	getAllProjects,
	getMyPosts,
	getUserPosts,
	updatePost,
	getUserPrivatePosts,
	createPrivatePost,
} from "../API/post";

// 0x7D4526A543101211805CA68CcE453f5ed39Fef52
// 0x4A4041D2E129a2A7aC58725Fbb7A2BBF4414cDFB
import { ConnectFind } from "../API/index";
const App = () => {
	const { isAuthenticatedContext } = useContext(UserContext);

	async function init() {
		await loadWeb3();
	}

	const [address, setAddress] = useState(false);

	const captureFile = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		const reader = new window.FileReader();
		reader.readAsArrayBuffer(file);

		reader.onloadend = async () => {
			const hash = await UploadImage(Buffer(reader.result));
			//https://ipfs.infura.io/ipfs/hash
		};
	};

	useEffect(() => {
		init().then(() => {
			getCurrentUser()
				.then((hash) => {
					setAddress(hash);
					ConnectFind().then((data) => {
						getAllProjects({ d_connect: data, address: hash }).then(
							(data) => {
								console.log(data[0].title);
							}
						);
						// getMyPosts({ d_connect: data, address: hash }).then(
						// 	(data) => {
						// 		console.log(data);
						// 	}
						// );
						// getUserPrivatePosts({
						// 	d_connect: data,
						// 	address: hash,
						// 	user: "0x4A4041D2E129a2A7aC58725Fbb7A2BBF4414cDFB",
						// }).then((data) => {
						// 	console.log(data);
						// });
						// getMyPosts({
						// 	d_connect: data,
						// 	address: hash,
						// 	user: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// updateUser({
						// 	d_connect: data,
						// 	name: "zeel2.0",
						// 	photo: "null",
						// 	bio: "this is me",
						// 	address: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// createUser({
						// 	d_connect: data,
						// 	name: "zeel",
						// 	photo: "null",
						// 	bio: "this is me",
						// 	address: hash,
						// 	amount: 2,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// updatePost({
						// 	d_connect: data,
						// 	title: "secound post nahi hei",
						// 	photo: "null",
						// 	caption: "demo 311",
						// 	address: hash,
						// 	id: 0,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// createPrivatePost({
						// 	d_connect: data,
						// 	title: "lkk post nahi hei",
						// 	photo: "null",
						// 	caption: "demo 311",
						// 	address: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// createPost({
						// 	d_connect: data,
						// 	title: "secound post",
						// 	photo: "null",
						// 	caption: "demo 311",
						// 	address: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// getAllUsers({ d_connect: data, address: hash }).then(
						// 	(data) => {
						// 		console.log(data);
						// 	}
						// );
						// getMySubscriptionsList({
						// 	d_connect: data,
						// 	address: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// getUser({
						// 	d_connect: data,
						// 	address: hash,
						// 	user: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// subscribedUser({
						// 	d_connect: data,
						// 	address: hash,
						// 	user: "0x7D4526A543101211805CA68CcE453f5ed39Fef52",
						// 	amount: 2,
						// }).then((data) => {
						// 	console.log(data);
						// });
					});
				})
				.catch((e) => console.log(e));
		});
	});

	return (
		<div className="relative min-h-screen pb-48 pt-24 subpixel-antialiased selection:bg-blue-100 lg:pb-56 lg:pt-32">
			<Navbar address={address} />
			<Routes>
				{/* <Route path="/" element={<Home address={address} />} /> */}
				<Route path="/register" element={<Register />} />
				{/* <Route path="login" element={<Login />} /> */}
				<Route
					path="update-post"
					element={<UpdatePost address={address} />}
				/>
				<Route path="/hash" element={<Profile address={address} />} />
			</Routes>
			<div>
				<input type="file" name="file" onChange={captureFile}></input>
			</div>

			<Footer />
		</div>
	);
};

export default App;
