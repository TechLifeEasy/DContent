import { PencilAltIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";

const Profile = () => {
	const { username } = useParams();

	return (
		<>
			<main className="container space-y-10 lg:space-y-20">
				<section className="space-y-3">
					<img
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
						alt="profile"
						className="mx-auto h-48 w-48 flex-shrink rounded-lg object-cover lg:h-52 lg:w-52"
					/>
					<div className="flex flex-col justify-around gap-3 text-center">
						<h4 className="text-3xl font-semibold text-blue-600 lg:text-4xl">
							John Doe
						</h4>
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
						<p className="prose prose-zinc mx-auto lg:prose-lg">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Earum quam obcaecati recusandae cupiditate vel
							corrupti voluptate eveniet eum iste autem.
						</p>
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
						<button className="ml-auto mt-5 flex items-center justify-center gap-1 rounded-lg border-2 border-blue-600 px-5 py-3 font-semibold text-blue-600 transition-colors active:bg-blue-500 active:text-white lg:text-lg">
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
