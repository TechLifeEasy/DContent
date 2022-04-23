import React from "react";

const SubscribeCTA = () => {
	return (
		<div>
			<section class="mt-10 bg-blue-500">
				<div class="container mx-auto grid grid-cols-2 gap-8 py-8 text-center md:grid-cols-4">
					<div>
						<h5 class="text-5xl font-bold text-white">
							<span class="inline text-white">2179</span>
							<span class="text-indigo-200">+</span>
						</h5>
						<p class="text-xs font-medium uppercase tracking-wide text-indigo-100">
							Cups of coffee
						</p>
					</div>
					<div>
						<h5 class="text-5xl font-bold text-white">
							<span class="inline text-white">13</span>
							<span class="text-indigo-200">+</span>
						</h5>
						<p class="text-xs font-medium uppercase tracking-wide text-indigo-100">
							Ongoing contracts
						</p>
					</div>
					<div>
						<h5 class="text-5xl font-bold text-white">
							<span class="inline text-white">31</span>
							<span class="text-indigo-200">+</span>
						</h5>
						<p class="text-xs font-medium uppercase tracking-wide text-indigo-100">
							Finished projects
						</p>
					</div>
					<div>
						<h5 class="text-5xl font-bold text-white">
							<span class="inline text-white">3</span>
							<span class="text-indigo-200">+</span>
						</h5>
						<p class="text-xs font-medium uppercase tracking-wide text-indigo-100">
							Years in business
						</p>
					</div>
				</div>
				<div class="mx-auto mt-4 flex w-52 p-4">
					<button
						type="button"
						class="w-full rounded-lg  bg-white py-2 px-4 text-center text-base font-semibold text-indigo-500 text-white shadow-md transition duration-200 ease-in hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 ">
						Join
					</button>
				</div>
			</section>
		</div>
	);
};

export default SubscribeCTA;
