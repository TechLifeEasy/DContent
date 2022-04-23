import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import {
	HeartIcon as HeartIconSolid,
	PencilAltIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

const PostCard = ({ isInProfilePage }) => {
	const [liked, setLiked] = useState(false);
	const [readMore, setReadMore] = useState(false);

	return (
		<div className="space-y-3">
			<img
				src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
				alt="post"
				className="aspect-square w-full rounded-lg object-cover"
			/>
			<div className="space-y-1">
				<div className="flex items-center justify-between gap-3">
					<h4 className="text-2xl font-semibold text-blue-600 lg:text-3xl">
						Intersting Title
					</h4>
					<button
						onClick={() => setLiked(!liked)}
						className={`inline-flex items-center justify-center gap-1 rounded-lg border-2 border-pink-600 px-3 py-1 text-sm font-semibold transition-colors active:bg-pink-600 active:text-white lg:text-base ${
							!liked ? "text-pink-600" : "bg-pink-600 text-white"
						}`}>
						<span>
							{!liked ? (
								<HeartIconOutline className="h-4 w-4 lg:h-5 lg:w-5" />
							) : (
								<HeartIconSolid className="h-4 w-4 lg:h-5 lg:w-5" />
							)}
						</span>{" "}
						<span>{!liked ? "Like" : "Liked"}</span>
					</button>
				</div>
				<p
					className={`prose prose-zinc ${
						!readMore && "line-clamp-2"
					} lg:prose-lg`}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Veniam autem numquam cum in est nisi deleniti? Fugiat
					obcaecati modi ipsum?
				</p>
				<div className="flex items-center justify-between gap-3">
					<button
						onClick={() => setReadMore(!readMore)}
						className="text-sm font-semibold text-zinc-600 lg:text-base">
						{!readMore ? "Read more" : "Show less"}
					</button>
					{isInProfilePage && (
						<button className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-blue-600 hover:underline lg:text-base">
							<span>
								<PencilAltIcon className="h-4 w-4 lg:h-5 lg:w-5" />
							</span>
							<span>Edit Post</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostCard;
