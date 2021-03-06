import UserContext from "./UserContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const pageLinks = [{ name: "Register", link: "/register" }];

const Navbar = () => {
	const { pathname } = useLocation();
	const { userContext, addressContext } = useContext(UserContext);
	const [address, setAddress] = addressContext;
	const [user, setUser] = userContext;
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) setIsScrolled(true);
			else setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	return (
		<header
			className={`fixed top-0 z-50 w-full border-b bg-white ${
				isScrolled ? "border-zinc-200" : "border-transparent"
			} transition-colors duration-300 print:hidden`}>
			<nav
				className="container relative flex items-center justify-between py-3"
				role="navigation">
				<Link
					to="/"
					className="text-3xl font-bold tracking-tight text-zinc-900 transition-colors active:text-blue-600 lg:text-4xl">
					DContent
				</Link>

				<ul className="flex items-center gap-1 font-semibold lg:gap-5">
					{user ? (
						<li>
							<Link
								to={`/${address}`}
								className={`$rounded-md py-1 px-1 transition-colors hover:bg-blue-50 active:text-blue-600 lg:px-2 lg:text-lg`}>
								{user.name}
								<span className="mx-1">({address})</span>
							</Link>
						</li>
					) : (
						<li>
							<Link
								to="/register"
								className={`${
									pathname === "/register"
										? "font-semibold text-zinc-900"
										: "font-normal text-zinc-600"
								} rounded-md py-1 px-1 transition-colors hover:bg-blue-50 active:text-blue-600 lg:px-2 lg:text-lg`}>
								Register
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
