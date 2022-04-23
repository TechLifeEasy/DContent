import React from "react";

const ContentFilterButton = () => {
	return (
		<div>
			<ul class="flex border-b border-gray-200 text-center">
				<li class="flex-1">
					<a
						class="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium"
						href="">
						<span class="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
						Subscription
					</a>
				</li>

				<li class="flex-1 pl-px">
					<a
						class="block bg-blue-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white"
						href="">
						Free Contents
					</a>
				</li>
			</ul>
		</div>
	);
};

export default ContentFilterButton;
