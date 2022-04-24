import {
	PencilAltIcon,
	PencilIcon,
	XIcon,
	CheckIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import Image from "./Image";
import UserContext from "./UserContext";
import { UploadImage } from "../API";
import {
	getUser,
	getMySubscriptionsList,
	updateUser,
	getUsersAmount,
	subscribedUser,
} from "../API/user";
import { getMyPosts } from "../API/post";

const Profile = () => {
	const { userContext, addressContext, dConnectContext } =
		useContext(UserContext);

	const { hash } = useParams();
	const [name, setName] = useState(null);
	const [isNameError, setIsNameError] = useState(false);
	const [bio, setBio] = useState(null);
	const [amount, setAmount] = useState(0);
	const [isAmountError, setIsAmountError] = useState(false);
	const [isBioError, setIsBioError] = useState(false);
	const [changeImage, setChangeImage] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);
	const [address, setAddress] = addressContext;
	const [dConnect, setDConnect] = dConnectContext;
	const [isEditing, setIsEditing] = useState(false);
	const [user, setUser] = userContext;

	const [cu_user, setcuUser] = useState(null);
	const [list, setListData] = useState([]);
	const [posts, setPosts] = useState([]);

	const validateName = (name) => {
		const validate = /^[a-z ]+$/gi;
		if (name !== null && (!validate.test(name) || name === "")) {
			setIsNameError(true);
		} else {
			setIsNameError(false);
		}
	};

	useEffect(() => {
		const validateBio = (e) => {
			if (e !== null && e.trim() === "") {
				setIsBioError(true);
			} else {
				setIsBioError(false);
			}
		};
		validateBio(bio);
	}, [bio]);

	useEffect(() => {
		validateName(name);
	}, [name]);

	const Subscribe = () => {
		subscribedUser({
			d_connect: dConnect,
			address: address,
			user: cu_user.addr,
			amount:2
		}).then((data) => {
			console.log(data);
		});
	};

	useEffect(() => {
		document.title = "Profile";
		getUser({
			d_connect: dConnect,
			address: address,
			user: hash,
		}).then((data) => {
			// console.log(user);
			setcuUser(data);
			getUsersAmount({
				d_connect: dConnect,
				address: address,
				user: hash,
			}).then((amount) => {
				setAmount(amount);
			});
		});

		// getMySubscriptionsList({
		// 	d_connect: dConnect,
		// 	address: address,
		// }).then((data) => {
		// 	setListData(data);
		// });

		// getMyPosts({
		// 	d_connect: dConnect,
		// 	address: address,
		// }).then((data) => {
		// 	setPosts(data);
		// });
	}, [address]);

	const handleSubmit = () => {
		if (name === null || isNameError) {
			setIsNameError(true);
			return null;
		}

		if (amount === null || isAmountError) {
			setIsAmountError(true);
			return null;
		}

		if (bio === null || isBioError) {
			setIsBioError(true);
			return null;
		}

		if (file === null || fileError) {
			setFileError(true);
			return null;
		}

		// const captureFile = () => {
		// 	let hash;
		// 	const reader = new window.FileReader();
		// 	reader.readAsArrayBuffer(file);
		// 	reader.onloadend = async () => {
		// 		hash = await UploadImage(Buffer(reader.result));
		// 		console.log(hash);
		// 		//https://ipfs.infura.io/ipfs/hash
		// 	};
		// };

		// captureFile();

		console.log("call");
		const sendData = async (hash) => {
			const isUserCreated = await updateUser({
				d_connect: dConnect,
				name,
				photo: hash,
				bio,
				address,
				amount: amount,
			});
			console.log(isUserCreated);
			if (isUserCreated) {
				const user = await getUser({
					d_connect: dConnect,
					address: address,
					user: address,
				});
				console.log(user);
				setUser(user);
			}
		};
		sendData(user.hash);
	};

	if (!cu_user) {
		return <></>;
	}

	return (
		<>
			<main className="container space-y-10 lg:space-y-20">
				<div>
					{cu_user.address === user.address && !isEditing ? (
						<button
							onClick={() => {
								setIsEditing(true);
								setName(cu_user.name);
								setBio(cu_user.bio);
								// setAmount(cu_user.amount.toString());
							}}
							className="active:text-name ml-auto flex items-center justify-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3  font-semibold transition-colors active:bg-blue-500 lg:text-lg">
							<span>
								<PencilIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</span>
							<span>Edit Profile</span>
						</button>
					) : (
						<div className="ml-auto w-max space-x-3 lg:col-span-2">
							<button
								onClick={() => setIsEditing(false)}
								className="inline-flex items-center gap-1 rounded-lg border-2 border-red-600 px-5 py-3 font-semibold transition-colors focus:outline-none active:bg-red-600 active:text-white lg:text-lg">
								<XIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="inline-flex items-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white lg:text-lg">
								<CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Done
							</button>
						</div>
					)}
				</div>
				<section className="space-y-3">
					{/* <img
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
						alt="profile"
						className="mx-auto h-48 w-48 flex-shrink rounded-lg object-cover lg:h-52 lg:w-52"
					/> */}
					<div className="space-y-3">
						{!changeImage ? (
							<img
								src={`https://ipfs.infura.io/ipfs/${cu_user.photo}`}
								alt="post"
								className="mx-auto h-48 w-48 flex-shrink rounded-lg object-cover lg:h-52 lg:w-52"
							/>
						) : (
							<Image
								file={file}
								setFile={setFile}
								fileError={fileError}
							/>
						)}
						{/* {isEditing && (
							<>
								{!changeImage ? (
									<button
										onClick={() => setChangeImage(true)}
										className="inline-flex items-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white lg:text-base xl:text-lg">
										<PencilAltIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										Change Image
									</button>
								) : (
									<div className="space-x-3">
										<button
											onClick={() => {
												setChangeImage(false);
											}}
											className="inline-flex items-center gap-1 rounded-lg border-2 border-red-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-red-600 active:text-white lg:text-base xl:text-lg">
											<XIcon className="h-4 w-4 lg:h-5 lg:w-5" />
											Cancel
										</button>
										<button className="inline-flex items-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white lg:text-base xl:text-lg">
											<CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
											Done
										</button>
									</div>
								)}
							</>
						)} */}
					</div>
					<div className="flex flex-col justify-around gap-3 text-center">
						{!isEditing ? (
							<>
								<h4 className="text-3xl font-semibold text-blue-600 lg:text-4xl">
									{cu_user.name}
								</h4>
								<h6 className="text-sm font-semibold text-blue-600">
									{cu_user.addr}
								</h6>
							</>
						) : (
							<div className="mx-auto w-full max-w-prose">
								<label
									htmlFor="name"
									className="block text-sm font-semibold text-zinc-600 lg:text-base">
									Name <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									name="name"
									placeholder="Name"
									onChange={(e) => setName(e.target.value)}
									className="w-full truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"
									value={name}
								/>
								{isNameError && (
									<p className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
										<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										Please enter a valid name
									</p>
								)}
							</div>
						)}
						{/* <div className="mx-auto flex gap-10">
							<p className="flex flex-col items-center gap-1">
								<span className="font-semibold lg:text-lg">
									Followers
								</span>
								<span className="text-xl lg:text-2xl">25</span>
							</p>
							<p className="flex flex-col items-center gap-1">
								<span className="font-semibold lg:text-lg">
									Following
								</span>
								<span className="text-xl lg:text-2xl">15</span>
							</p>
						</div> */}
						{!isEditing ? (
							<p className="prose prose-zinc mx-auto lg:prose-lg">
								{cu_user.bio}
							</p>
						) : (
							<div>
								<label
									htmlFor="bio"
									className="block text-sm font-semibold text-zinc-600 lg:text-base">
									Bio <span className="text-red-600">*</span>
								</label>
								<textarea
									type="text"
									name="bio"
									value={bio}
									placeholder="Tell us something about yourself"
									rows={5}
									onChange={(e) => setBio(e.target.value)}
									className="w-full resize-none truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"></textarea>
							</div>
						)}
						{cu_user.addr !== user.addr && (
							<>
								<h1>{amount}</h1>
								<p className="prose prose-zinc mx-auto lg:prose-lg">
									Want to have more of my content?
									<span className="text-blue-600">
										{" "}
										Subscribe to my exclusive content
										membership! )
									</span>
								</p>
								<button
									onClick={() => {
										Subscribe()
									}}
									className="mx-auto w-full max-w-prose rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors active:bg-blue-700 lg:text-lg">
									Subscribe
								</button>
							</>
						)}
					</div>
				</section>
				<section>
					<div>
						<ul className="flex border-b border-gray-200 text-center">
							<li className="flex-1">
								<a
									className="relative block rounded-t-lg border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium"
									href="#">
									<span className="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
									Posts
								</a>
							</li>
						</ul>
					</div>

					<div>
						<button
							onClick={() => {
								window.location.href = "/new-post";
							}}
							className="ml-auto mt-5 flex items-center justify-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 font-semibold transition-colors active:bg-blue-500 active:text-white lg:text-lg">
							<span>
								<PencilAltIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</span>
							<span>Create new post</span>
						</button>
					</div>

					<div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
						{posts.map((data) => {
							return <PostCard isInProfilePage={true} />;
						})}
					</div>

					<div>
						<ul className="flex border-b border-gray-200 text-center">
							<li className="flex-1">
								<a
									className="relative block rounded-t-lg border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium"
									href="#">
									<span className="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
									SubScription
								</a>
							</li>
						</ul>
					</div>

					<div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
						{list.map((data) => {
							return <Profile id={data} />;
						})}
					</div>
				</section>
			</main>
		</>
	);
};

export default Profile;
