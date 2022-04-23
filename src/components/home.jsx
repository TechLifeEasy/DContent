import Profile from "./ProfileCard";
import Post from "./PostCard";

const Home = ({ address }) => {
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
						<Profile />
						<Profile />
						<Profile />
						<Profile />
					</div>
				</section>
				<section className="space-y-5">
					<h1 className="text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
						Posts
					</h1>
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
						<Post />
						<Post />
						<Post />
						<Post />
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;
