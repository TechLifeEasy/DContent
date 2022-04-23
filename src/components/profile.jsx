import { useParams } from "react-router-dom";

const Profile = () => {
	const { username } = useParams();

	return (
		<>
			<main className="container">
				<h1>Hello {username}</h1>
			</main>
		</>
	);
};

export default Profile;
