import Profile from "./ProfileCard";
import Post from "./PostCard";
import { useEffect } from "react";
import UserContext from "./UserContext";
import { useContext, useState } from "react";
import { getAllUsers } from "../API/user";
import { getAllProjects } from "../API/post";

const Home = () => {
	const { userContext, addressContext, dConnectContext } =
		useContext(UserContext);
	const [users, setUsers] = useState([]);
	const [post, setPosts] = useState([]);

	const [address, setAddress] = addressContext;
	const [dConnect, setDConnect] = dConnectContext;
	useEffect(() => {
		document.title = "DContent";
		console.log(dConnect);

		if (dConnect) {
			getAllProjects({ d_connect: dConnect, address: address }).then(
				(data) => {
					setPosts(data);
				}
			);

			getAllUsers({ d_connect: dConnect, address: address }).then(
				(data) => {
					setUsers(data);
				}
			);
		}
	}, [dConnect]);

	return (
		<>
			<main className="container space-y-10">
				<section className="grid place-content-center gap-5 rounded-lg bg-blue-50 py-28 px-3">
					<h1 className="max-w-2xl text-center text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
						A decentralized app dedicated to content creators
					</h1>
					<p className="prose prose-zinc text-center lg:prose-lg">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Tempore tenetur blanditiis eligendi aut laudantium
						maxime repudiandae natus quo ea soluta.
					</p>
				</section>
				<section className="space-y-5">
					<h1 className="text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
						Profiles
					</h1>
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
						{users.map((data) => {
							console.log(data);
							return <Profile id={data} />;
						})}
					</div>
				</section>
				<section className="space-y-5">
					<h1 className="text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
						Posts
					</h1>
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
						{post.map((data) => {
							return <Post {...data} />;
						})}
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;
