const PostCard = () => {
	return (
		<div className="space-y-3">
			<img
				src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdW50YWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
				alt="post"
				className="aspect-square w-full rounded-lg object-cover"
			/>
			<div className="space-y-1">
				<h4 className="text-2xl font-semibold text-blue-600 lg:text-3xl">
					Intrsting Title
				</h4>
				<p className="prose prose-zinc line-clamp-3 lg:prose-lg">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Veniam autem numquam cum in est nisi deleniti? Fugiat
					obcaecati modi ipsum?
				</p>
			</div>
		</div>
	);
};

export default PostCard;
