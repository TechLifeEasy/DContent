import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import UpdatePost from "./UpdatePost";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { loadWeb3 } from "../API/index";
const App = () => {
	async function init() {
		await loadWeb3();
	}

	useEffect(() => {
		init();
	});

	return (
		<div className="relative min-h-screen pb-48 pt-24 subpixel-antialiased selection:bg-blue-100 lg:pb-56 lg:pt-32">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="update-post" element={<UpdatePost />} />
				<Route path=":username" element={<Profile />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
