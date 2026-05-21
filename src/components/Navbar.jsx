import { useState } from "react";
import { Link } from "react-router-dom";

// Component Logo được thiết kế lại màu sắc để nổi bật trên nền Navbar tối
const Logo = () => (
	<Link
		to="/"
		className="flex items-center gap-3 hover:opacity-80 transition-opacity"
	>
		{/* Icon Logo */}
		<div className="relative w-10 h-10">
			<div className="absolute inset-0 bg-blue-500 rounded-full opacity-90 flex items-center justify-center border-2 border-blue-400 shadow-inner"></div>
			<div className="absolute w-8 h-8 top-1 right-1 bg-orange-500 rounded-full flex items-center justify-center border-2 border-orange-400 shadow-inner"></div>
			<div className="absolute w-5 h-0.5 bg-white top-5 left-5 rotate-[-15deg] rounded shadow-sm z-10"></div>
			<div className="absolute w-1.5 h-1.5 bg-white top-3.5 left-4 rounded-full z-10"></div>
			<div className="absolute w-1.5 h-1.5 bg-white top-6 left-8 rounded-full z-10"></div>
		</div>

		{/* Chữ Logo (Màu trắng cho nền tối) */}
		<div className="flex flex-col">
			<span className="text-xl font-bold text-white tracking-tight leading-none">
				React Học Viện
			</span>
			<span className="text-[10px] text-gray-300 font-medium tracking-widest uppercase mt-1">
				Sổ Tay Học Tập
			</span>
		</div>
	</Link>
);

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-gray-800 text-white p-4 shadow-md relative z-50">
			<div className="container mx-auto flex justify-between items-center">
				{/* Đã thay thế dòng chữ "My React App" bằng component Logo */}
				<Logo />

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
					className={`${
						isOpen ? "flex" : "hidden"
					} md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 lg:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0 border-t md:border-none border-gray-700`}
				>
					<Link
						to="/"
						className="block py-2 px-4 font-medium hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 rounded transition"
						onClick={() => setIsOpen(false)}
					>
						Trang Chủ
					</Link>
					<Link
						to="/calculator"
						className="block py-2 px-4 font-medium hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400 rounded transition"
						onClick={() => setIsOpen(false)}
					>
						Máy Tính
					</Link>
				</div>
			</div>
		</nav>
	);
}
