import { useContext, useState } from "react";
import { useEffect } from "react";
import UserContext from "./UserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
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

const ProfileCard = ({ id }) => {
	const { userContext, addressContext, dConnectContext } =
		useContext(UserContext);
	const [user, setUser] = useState(false);
	const [address, setAddress] = addressContext;
	const [dConnect, setDConnect] = dConnectContext;
	const navigate = useNavigate();
	useEffect(() => {
		console.log(id);
		getUser({
			d_connect: dConnect,
			address: address,
			user: id,
		}).then((data) => {
			console.log(user)
			setUser(data);
		});
	}, []);

	if (!user) {
		return <></>;
	}

	return (
		<div
			className="flex cursor-pointer gap-5 space-y-3 "
			onClick={() => {
				navigate(`/${user.addr}`);
			}}>
			<img
				src={`https://ipfs.infura.io/ipfs/${user.photo}`}
				alt="profile"
				className="h-28 w-28 flex-shrink rounded-lg object-cover md:h-32 md:w-32 lg:h-36 lg:w-36"
			/>
			<div className="flex flex-grow flex-col justify-around">
				<h4 className="text-center text-2xl font-semibold text-blue-600 lg:text-3xl">
					{user.name}
				</h4>
				<p className="prose prose-zinc mx-auto max-w-sm text-center lg:prose-lg">
					{user.bio}
				</p>
				{/* <div className="flex gap-1 divide-x divide-zinc-300">
					<p className="flex w-full flex-col items-center gap-1">
						<span className="text-sm font-semibold lg:text-base">
							Followers
						</span>
						<span className="text-lg lg:text-xl">25</span>
					</p>
					<p className="flex w-full flex-col items-center gap-1">
						<span className="text-sm font-semibold lg:text-base">
							Following
						</span>
						<span className="text-lg lg:text-xl">15</span>
					</p>
				</div> */}
			</div>
		</div>
	);
};

export default ProfileCard;
