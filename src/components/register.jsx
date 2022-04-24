import Image from "./Image";
import UserContext from "./UserContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { UploadImage } from "../API/index";
import { createUser } from "../API/user";
import { Navigate } from "react-router-dom";
import { loadWeb3 } from "../API/index";
import { getCurrentUser, getUser } from "../API/user";
import { ConnectFind } from "../API";

const Register = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Register";
	}, []);

	const { addressContext, dConnectContext, userContext } =
		useContext(UserContext);
	const [address, setAddress] = addressContext;
	const [dConnect, setDConnect] = dConnectContext;
	const [user, setUser] = userContext;
	const [name, setName] = useState(null);
	const [isNameError, setIsNameError] = useState(false);
	const [amount, setAmount] = useState(null);
	const [isAmountError, setIsAmountError] = useState(false);
	const [bio, setBio] = useState(null);
	const [isBioError, setIsBioError] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);

	useEffect(() => {
		const validateName = (e) => {
			const validate = /^[a-z ]+$/gi;
			if (e !== null && (!validate.test(e.trim()) || e.trim() === "")) {
				setIsNameError(true);
			} else {
				setIsNameError(false);
			}
		};
		validateName(name);
	}, [name]);

	useEffect(() => {
		const validateAmount = (e) => {
			const validate = /^\d+$/gi;
			if (e !== null && (!validate.test(e.trim()) || e.trim() === "")) {
				setIsAmountError(true);
			} else {
				setIsAmountError(false);
			}
		};
		validateAmount(amount);
	}, [amount]);

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

		const captureFile = () => {
			let hash;
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);
			reader.onloadend = async () => {
				hash = await UploadImage(Buffer(reader.result));
				//https://ipfs.infura.io/ipfs/hash
			};
			return hash;
		};

		const hash = captureFile();
		const sendData = async () => {
			const isUserCreated = await createUser(
				dConnect,
				name,
				hash,
				bio,
				address,
				+amount
			);
			console.log(isUserCreated);
			if (isUserCreated) {
				const user = await getUser({
					d_connect: dConnect,
					address: address,
					user: address,
				});
				console.log(user);
				setUser(user);
				return navigate("/");
			}
		};
		sendData();
	};

	return (
		<main className="container">
			<section className="align-items mx-auto flex w-full max-w-2xl flex-col gap-10 rounded-lg bg-blue-50 p-10">
				<h1 className="max-w-2xl pt-10 text-center text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
					Setting your profile
				</h1>
				<form
					className="w-full space-y-3"
					onSubmit={(e) => e.preventDefault()}>
					<div>
						<Image
							file={file}
							setFile={setFile}
							fileError={fileError}
						/>
						{fileError && (
							<p className="flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
								<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Please upload an Image
							</p>
						)}
					</div>
					<div>
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
						/>
						{isNameError && (
							<p className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
								<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Please enter a valid name
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="bio"
							className="block text-sm font-semibold text-zinc-600 lg:text-base">
							Bio <span className="text-red-600">*</span>
						</label>
						<textarea
							type="text"
							name="bio"
							placeholder="Tell us something about yourself"
							rows={5}
							onChange={(e) => setBio(e.target.value)}
							className="w-full resize-none truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"></textarea>
						{isBioError && (
							<p className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
								<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Bio can't be empty
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="amount"
							className="block text-sm font-semibold text-zinc-600 lg:text-base">
							Amount <span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							name="amount"
							placeholder="Amount"
							onChange={(e) => setAmount(e.target.value)}
							className="w-full truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"
						/>
						{isAmountError && (
							<p className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
								<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Please enter a valid amount
							</p>
						)}
					</div>
					<button
						onClick={handleSubmit}
						className="w-full rounded-md border-2 border-blue-600 px-5 py-3 font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white md:text-lg">
						Submit
					</button>
				</form>
			</section>
		</main>
	);
};

export default Register;
