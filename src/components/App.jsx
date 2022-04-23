import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import { Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<div className="relative min-h-screen pb-48 pt-24 subpixel-antialiased selection:bg-blue-100 lg:pb-56 lg:pt-32">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path=":username" element={<Profile />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
