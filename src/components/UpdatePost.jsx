import Image from "./Image";
import { XIcon, CheckIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

const UpdatePost = () => {
	const [title, setTitle] = useState(false);
	const [description, setDescription] = useState(false);
	const [changeImage, setChangeImage] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(false);

	return (
		<>
			<main className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
				<div className="ml-auto w-max space-x-3 lg:col-span-2">
					<button className="inline-flex items-center gap-1 rounded-lg border-2 border-red-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-red-600 active:text-white lg:text-base">
						<XIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						Cancel
					</button>
					<button className="inline-flex items-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 text-sm font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white lg:text-base">
						<CheckIcon className="h-4 w-4 lg:h-5 lg:w-5" />
						Done
					</button>
				</div>
				<div className="w-full space-y-3">
					{!changeImage ? (
						<img
							src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
							alt="post"
							className="aspect-square w-full rounded-lg"
						/>
					) : (
						<Image
							file={file}
							setFile={setFile}
							fileError={fileError}
						/>
					)}
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
				</div>
			</main>
		</>
	);
};

export default UpdatePost;
