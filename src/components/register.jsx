import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const Register = () => {
	const MAX_STEP = 2;
	const [step, setStep] = useState(1);
	const [name, setName] = useState(null);
	const [isNameError, setIsNameError] = useState(false);
	const [bio, setBio] = useState(null);

	const validateName = (e) => {
		const validate = /^[a-z ]+$/gi;
		if (e !== null && (!validate.test(e.trim()) || e.trim() === "")) {
			setIsNameError(true);
		} else {
			setIsNameError(false);
		}
	};

	useEffect(() => {
		validateName(name);
	}, [name]);

	return (
		<>
			<main className="container">
				<section className="relative mx-auto grid max-w-2xl place-content-center gap-10 rounded-lg bg-blue-50 p-10">
					<p className="absolute left-5 top-5 font-light text-zinc-600">
						Step {step} of {MAX_STEP}
					</p>
					{step === 1 && (
						<>
							<h1 className="max-w-2xl pt-10 text-center text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
								Register
							</h1>
							<div className="grid place-content-center gap-3">
								<button className="inline-flex items-center justify-between gap-3 rounded-lg bg-blue-600 px-5 py-3 text-white transition-colors active:bg-blue-700 lg:text-lg">
									<span>
										<svg
											className="h-7 w-7 lg:h-9 lg:w-9"
											stroke="currentColor"
											fill="currentColor"
											strokeWidth="0"
											viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
										</svg>
									</span>
									<span>LogIn with GitHub</span>
								</button>
								<button className="inline-flex items-center justify-between gap-3 rounded-lg bg-blue-600 px-5 py-3 text-white transition-colors active:bg-blue-700 lg:text-lg">
									<span>
										<svg
											className="h-7 w-7 lg:h-9 lg:w-9"
											stroke="currentColor"
											fill="currentColor"
											strokeWidth="0"
											viewBox="0 0 16 16"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
										</svg>
									</span>
									<span>LogIn with Google</span>
								</button>
							</div>
							<p>
								Already have an account?{" "}
								<Link
									to="/login"
									className="text-blue-600 hover:underline">
									LogIn here
								</Link>
							</p>
						</>
					)}
					{step === 2 && (
						<>
							<h1 className="max-w-2xl pt-10 text-center text-4xl font-bold tracking-tighter text-zinc-900 lg:text-5xl">
								Setting your profile
							</h1>
							<form
								className="w-full space-y-3"
								onSubmit={(e) => e.preventDefault()}>
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-semibold text-zinc-600 lg:text-base">
										Name{" "}
										<span className="text-red-600">*</span>
									</label>
									<input
										type="text"
										name="name"
										placeholder="Name"
										onChange={(e) =>
											setName(e.target.value)
										}
										className="w-full truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"
									/>
									{isNameError && (
										<p className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 lg:text-base">
											<ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
											Please enter a valid name
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="bio"
										className="block text-sm font-semibold text-zinc-600 lg:text-base">
										Bio{" "}
										<span className="text-red-600">*</span>
									</label>
									<textarea
										type="text"
										name="bio"
										placeholder="Tell us something about yourself"
										rows={5}
										onChange={(e) => setBio(e.target.value)}
										className="w-full resize-none truncate rounded-lg border-zinc-300 p-3 text-sm text-gray-700 placeholder-gray-600 ring-blue-600 transition-all focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-2 lg:text-base"></textarea>
								</div>
								<button className="w-full rounded-md border-2 border-blue-600 px-5 py-3 font-semibold transition-colors focus:outline-none active:bg-blue-600 active:text-white md:text-lg">
									Submit
								</button>
							</form>
						</>
					)}
				</section>
			</main>
		</>
	);
};

export default Register;
