const socialLinks = [
	{ name: "Barun Debnath,", link: "#" },
	{ name: "Darshan Savaliya,", link: "#" },
	{ name: "Vatsal Sakariya,", link: "#" },
	{ name: "Zeel Prajapati", link: "#" },
];

const Footer = () => {
	return (
		<>
			<footer className="absolute bottom-0 z-0 w-full space-x-1 border-t border-zinc-200 bg-white py-3 text-center print:hidden">
				Made with ❤️ by{" "}
				{socialLinks.map(({ name, link }, index) => (
					<a
						key={index}
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-blue-600 active:underline">
						{name}
					</a>
				))}
			</footer>
		</>
	);
};

export default Footer;
