import { useParams } from "react-router-dom";
import BioCard from "./BioCard";
import ProfileCard from "./ProfileCard";
import SubscribeCard from "./SubscribeCard";
import ContentFilterButton from "./ContentFilterButton";
import PostCard from "./PostCard";
import SubscribeCTA from "./SubscribeCTA";

const Profile = () => {
	const { username } = useParams();

	return (
		<>
			<main className="container">
				<h1>Hello {username}</h1>
				<ProfileCard />
				<BioCard />
				<SubscribeCard />
				<ContentFilterButton />
				<div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
					<PostCard />
					<PostCard />
					<PostCard />
				</div>
				<SubscribeCTA />
			</main>
		</>
	);
};

export default Profile;
