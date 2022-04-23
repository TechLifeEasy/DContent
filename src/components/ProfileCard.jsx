const ProfileCard = () => {
	return (
		<div className="flex gap-5 space-y-3">
			<img
				src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
				alt="profile"
				className="h-28 w-28 flex-shrink rounded-lg object-cover md:h-32 md:w-32 lg:h-36 lg:w-36"
			/>
			<div className="flex flex-grow flex-col justify-around">
				<h4 className="text-center text-2xl font-semibold text-blue-600 lg:text-3xl">
					John Doe
				</h4>
				<div className="flex gap-1 divide-x divide-zinc-300">
					<p className="flex w-full flex-col items-center gap-1">
						<span className="text-sm font-semibold lg:text-base">
							Followers
						</span>
						<span className="text-lg lg:text-xl">25</span>
					</p>
					<p className="flex w-full flex-col items-center gap-1">
						<span className="text-sm font-semibold lg:text-base">
							Following
						</span>
						<span className="text-lg lg:text-xl">15</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
