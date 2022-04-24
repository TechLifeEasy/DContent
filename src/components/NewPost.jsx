import Image from "./Image";
import { XIcon, CheckIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UploadImage } from "../API";
import { createPrivatePost, createPost } from "../API/post.js";
import UserContext from "./UserContext";
var CryptoJS = require("crypto-js");

const UpdatePost = () => {
	const [title, setTitle] = useState(false);
	const [description, setDescription] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);
	const navigate = useNavigate();

	const { userContext, addressContext, dConnectContext } =
		useContext(UserContext);
	const [user, setUser] = userContext;
	const [address, setAddress] = addressContext;
	const [dConnect, setDConnect] = dConnectContext;

	const handleSubmit = () => {
		console.log("call");
		const captureFile = () => {
			let hash;
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);
			reader.onloadend = async () => {
				hash = await UploadImage(Buffer(reader.result));
				console.log(hash);
				sendData(hash.path);
				//https://ipfs.infura.io/ipfs/hash
			};
		};

		const sendData = (hash) => {
			console.log("call");
			if (isPrivate) {
				let encrypted_hash = CryptoJS.AES.encrypt(hash, address);
				createPrivatePost({
					d_connect: dConnect,
					title: title,
					photo: encrypted_hash,
					caption: description,
					address: address,
				}).then((data) => {
					console.log(data);
				});
			} else {
				createPost({
					d_connect: dConnect,
					title: title,
					photo: hash,
					caption: description,
					address: address,
				}).then((data) => {
					console.log(data);
				});
			}
		};
		captureFile();
	};

	return (
		<>
			<main className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
				<div className="ml-auto w-max space-x-3 lg:col-span-2">
					<button
						onClick={() => navigate("/")}
						className="inline-flex items-center gap-1 rounded-lg border-2 border-red-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-red-600 active:text-white lg:text-base">
						<XIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="inline-flex items-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white lg:text-base">
						<CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						Done
					</button>
				</div>
				<div className="w-full space-y-3">
					<Image
						file={file}
						setFile={setFile}
						fileError={fileError}
					/>
				</div>
				<div className="w-full space-y-3 text-zinc-600 lg:space-y-5">
					<div>
						<p className="text-sm font-semibold lg:text-base">
							Title
						</p>
						<input
							type="text"
							name="title"
							placeholder="Title"
							onChange={(e) => setTitle(e.target.value)}
							className="w-full truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"
						/>
					</div>
					<div>
						<p className="text-sm font-semibold lg:text-base">
							Description
						</p>
						<textarea
							type="text"
							name="description"
							placeholder="Description"
							rows={5}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full resize-none truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"></textarea>
					</div>
					<div>
						<p className="text-sm font-semibold lg:text-base">
							Private Post
						</p>
						<input
							type="checkbox"
							onChange={(e) => setIsPrivate(e.target.checked)}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default UpdatePost;
