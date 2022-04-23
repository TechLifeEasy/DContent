import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";
import { Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<div className="relative min-h-screen pb-48 pt-24 subpixel-antialiased selection:bg-blue-100 lg:pb-56 lg:pt-32">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
