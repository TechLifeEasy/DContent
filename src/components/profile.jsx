import {
	PencilAltIcon,
	PencilIcon,
	XIcon,
	CheckIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";

const Profile = () => {
	useEffect(() => {
		document.title = "Profile";
	}, []);

	const { hash } = useParams();
	const [name, setName] = useState(false);
	const [isNameError, setIsNameError] = useState(false);
	const [bio, setBio] = useState(false);
	const [changeImage, setChangeImage] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const validateName = (name) => {
		const validate = /^[a-z ]+$/gi;
		if (name !== null && (!validate.test(name) || name === "")) {
			setIsNameError(true);
		} else {
			setIsNameError(false);
		}
	};

	useEffect(() => {
		validateName(name);
	}, [name]);

	return (
		<>
			<main className="container space-y-10 lg:space-y-20">
				<div>
					{!isEditing ? (
						<button
							onClick={() => setIsEditing(true)}
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
							<button className="inline-flex items-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white lg:text-lg">
								<CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
								Done
							</button>
						</div>
					)}
				</div>
				<section className="space-y-3">
					<img
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
						alt="profile"
						className="mx-auto h-48 w-48 flex-shrink rounded-lg object-cover lg:h-52 lg:w-52"
					/>
					<div className="flex flex-col justify-around gap-3 text-center">
						{!isEditing ? (
							<h4 className="text-3xl font-semibold text-blue-600 lg:text-4xl">
								John Doe
							</h4>
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
								/>
								{isNameError && (
									<p className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
										<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
										Please enter a valid name
									</p>
								)}
							</div>
						)}
						<div className="mx-auto flex gap-10">
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
						</div>
						{!isEditing ? (
							<p className="prose prose-zinc mx-auto lg:prose-lg">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Earum quam obcaecati
								recusandae cupiditate vel corrupti voluptate
								eveniet eum iste autem.
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
									placeholder="Tell us something about yourself"
									rows={5}
									onChange={(e) => setBio(e.target.value)}
									className="w-full resize-none truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"></textarea>
							</div>
						)}
						<p className="prose prose-zinc mx-auto lg:prose-lg">
							Want to have more of my content?
							<span className="text-blue-600">
								{" "}
								Subscribe to my exclusive content membership!
							</span>
						</p>
						<button className="mx-auto w-full max-w-prose rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors active:bg-blue-700 lg:text-lg">
							Subscribe
						</button>
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
									Subscription
								</a>
							</li>

							<li className="flex-1 pl-px">
								<a
									className="block rounded-t-lg bg-blue-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white"
									href="#">
									Free Contents
								</a>
							</li>
						</ul>
					</div>
					<div>
						<button className="ml-auto mt-5 flex items-center justify-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 font-semibold transition-colors active:bg-blue-500 active:text-white lg:text-lg">
							<span>
								<PencilAltIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</span>
							<span>Create new post</span>
						</button>
					</div>
					<div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
						<PostCard isInProfilePage={true} />
						<PostCard isInProfilePage={true} />
						<PostCard isInProfilePage={true} />
					</div>
				</section>
			</main>
		</>
	);
};

export default Profile;
