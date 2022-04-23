import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import UpdatePost from "./UpdatePost";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadWeb3 } from "../API/index";
import { getCurrentUser, updateUser, getAllUsers, getUser } from "../API/user";
import { getAllProjects } from "../API/post";
import { ConnectFind } from "../API/index";
const App = () => {
	async function init() {
		await loadWeb3();
	}

	const [address, setAddress] = useState(false);

	useEffect(() => {
		init().then(() => {
			getCurrentUser()
				.then((hash) => {
					setAddress(hash);
					ConnectFind().then((data) => {
						// getAllProjects(data, hash).then((data) => {
						// 	console.log(data);
						// });
						// updateUser({
						// 	d_connect: data,
						// 	name: "zeel",
						// 	photo: "null",
						// 	bio: "this is me",
						// 	address: hash,
						// }).then((data) => {
						// 	console.log(data);
						// });
						// getAllUsers({ d_connect: data, address: hash }).then(
						// 	(data) => {
						// 		console.log(data);
						// 	}
						// );
						getUser({
							d_connect: data,
							address: hash,
							user: hash,
						}).then((data) => {
							console.log(data);
						});
					});
				})
				.catch((e) => console.log(e));
		});
	});

	return (
		<div className="relative min-h-screen pb-48 pt-24 subpixel-antialiased selection:bg-blue-100 lg:pb-56 lg:pt-32">
			<Navbar address={address} />
			<Routes>
				<Route path="/" element={<Home address={address} />} />
				{/* <Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} /> */}
				<Route
					path="update-post"
					element={<UpdatePost address={address} />}
				/>
				<Route path="/hash" element={<Profile address={address} />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
