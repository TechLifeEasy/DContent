import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./home";
import Register from "./register";
import Profile from "./profile";
import UpdatePost from "./UpdatePost";
import UserContext from "./UserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { loadWeb3 } from "../API/index";
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
// 0xe54C3C91204DeC99bf34635C7FFB539679Dfb90b
import { ConnectFind } from "../API/index";
const App = () => {
	const navigate = useNavigate();

	const { userContext, addressContext, dConnectContext } =
		useContext(UserContext);
	const [user, setUser] = userContext;
	const [address, setAddress] = addressContext;
	const [dConnect, setDConnect] = dConnectContext;

	useEffect(() => {
		document.title = "DContent";
		const init = async () => {
			try {
				await loadWeb3();
				const userHash = await getCurrentUser();
				setAddress(userHash);
				const data = await ConnectFind();
				console.log(data);
				setDConnect(data);
				const user = await getUser({
					d_connect: data,
					address: userHash,
					user: userHash,
				});
				console.log(user);
				// if (user === null) navigate("register");
				setUser(user);
			} catch (e) {
				console.error(e);
			}
		};
		init();
	}, [setUser, setAddress, setDConnect, navigate]);

	// useEffect(() => {
	// 	init().then(() => {
	// 		getCurrentUser()
	// 			.then((hash) => {
	// 				setAddress(hash);
	// 				ConnectFind().then((data) => {
	// 					// getAllProjects({ d_connect: data, address: hash }).then(
	// 					// 	(data) => {
	// 					// 		console.log(data[0].title);
	// 					// 	}
	// 					// );
	// 					// getMyPosts({ d_connect: data, address: hash }).then(
	// 					// 	(data) => {
	// 					// 		console.log(data);
	// 					// 	}
	// 					// );
	// 					// getUserPrivatePosts({
	// 					// 	d_connect: data,
	// 					// 	address: hash,
	// 					// 	user: "0x4A4041D2E129a2A7aC58725Fbb7A2BBF4414cDFB",
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// getMyPosts({
	// 					// 	d_connect: data,
	// 					// 	address: hash,
	// 					// 	user: hash,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// updateUser({
	// 					// 	d_connect: data,
	// 					// 	name: "zeel2.0",
	// 					// 	photo: "null",
	// 					// 	bio: "this is me",
	// 					// 	address: hash,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// createUser({
	// 					// 	d_connect: data,
	// 					// 	name: "kalubhai",
	// 					// 	photo: "null",
	// 					// 	bio: "this is me",
	// 					// 	address: hash,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// updatePost({
	// 					// 	d_connect: data,
	// 					// 	title: "secound post nahi hei",
	// 					// 	photo: "null",
	// 					// 	caption: "demo 311",
	// 					// 	address: hash,
	// 					// 	id: 0,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// createPrivatePost({
	// 					// 	d_connect: data,
	// 					// 	title: "lkk post nahi hei",
	// 					// 	photo: "null",
	// 					// 	caption: "demo 311",
	// 					// 	address: hash,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// createPost({
	// 					// 	d_connect: data,
	// 					// 	title: "secound post",
	// 					// 	photo: "null",
	// 					// 	caption: "demo 311",
	// 					// 	address: hash,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// getAllUsers({ d_connect: data, address: hash }).then(
	// 					// 	(data) => {
	// 					// 		console.log(data);
	// 					// 	}
	// 					// );
	// 					// getUser({
	// 					// 	d_connect: data,
	// 					// 	address: hash,
	// 					// 	user: hash,
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 					// subscribedUser({
	// 					// 	d_connect: data,
	// 					// 	address: hash,
	// 					// 	user: "0x4A4041D2E129a2A7aC58725Fbb7A2BBF4414cDFB",
	// 					// }).then((data) => {
	// 					// 	console.log(data);
	// 					// });
	// 				});
	// 			})
	// 			.catch((e) => console.log(e));
	// 	});
	// });

	return (
		<div className="relative min-h-screen pb-48 pt-24 subpixel-antialiased selection:bg-blue-100 lg:pb-56 lg:pt-32">
			<Navbar />
			<Routes>
				<Route path="register" element={<Register />} />
				<Route path="update-post" element={<UpdatePost />} />
				{user && <Route path="/:hash" element={<Profile />} />}
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
