import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-gray-800 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">My React App</div>

				{/* Nút Menu cho Mobile */}
				<button
					className="md:hidden block focus:outline-none cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				{/* Các liên kết trang */}
				<div
					className={`${isOpen ? "block" : "hidden"} md:flex space-x-0 md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent flex-col md:flex-row p-4 md:p-0 z-10`}
				>
					<Link
						to="/"
						className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 rounded transition"
						onClick={() => setIsOpen(false)}
					>
						Trang Chủ
					</Link>
					<Link
						to="/calculator"
						className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 rounded transition"
						onClick={() => setIsOpen(false)}
					>
						Máy Tính
					</Link>
				</div>
			</div>
		</nav>
	);
}
