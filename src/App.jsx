import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

export default function App() {
	return (
		<Router basename="/my-react-app">
			{/* Thêm dark:bg-[#121212] và dark:text-gray-200 để đổi màu nền và chữ toàn trang */}
			<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212] font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
				{/* 1. HEADER CHÍNH */}
				<header className="relative w-full bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
					{/* Lớp nền mờ họa tiết công nghệ */}
					<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
						<div className="absolute inset-0 bg-grid-pattern"></div>
						<div className="absolute w-16 h-16 bg-blue-500/20 rounded-lg top-10 left-[15%] rotate-12"></div>
						<div className="absolute w-8 h-8 bg-orange-500/10 rounded-full top-24 left-[40%]"></div>
						<div className="absolute w-12 h-12 bg-blue-400/20 rounded-md top-8 right-[20%] -rotate-6"></div>
						<div className="absolute w-6 h-6 bg-orange-400/10 rounded-lg top-28 right-[45%] rotate-[-20deg]"></div>
					</div>

					{/* Nội dung Tiêu đề được căn giữa hoàn hảo */}
					<div className="max-w-7xl mx-auto px-6 py-8 relative flex flex-col items-center justify-center text-center">
						<h1 className="text-3xl font-extrabold tracking-tighter text-blue-950 dark:text-blue-400 uppercase transition-colors">
							Hệ Thống Học Tập React JS Cơ Bản
						</h1>
						<p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 bg-blue-50 dark:bg-blue-900/20 px-5 py-2 rounded-full border border-blue-100 dark:border-blue-800/50 shadow-inner inline-block transition-colors">
							Lộ trình bài bản dành cho người mới bắt đầu
						</p>
					</div>
				</header>

				{/* 2. NAVIGATION MENU */}
				<Navbar />

				{/* 3. KHU VỰC NỘI DUNG CHÍNH */}
				<main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/calculator" element={<Calculator />} />
					</Routes>
				</main>

				{/* 4. FOOTER */}
				<footer className="bg-gray-800 dark:bg-black text-gray-400 text-center py-5 text-sm border-t border-gray-700 dark:border-gray-800 transition-colors duration-300">
					&copy; {new Date().getFullYear()} - Sổ Tay Học Tập ReactJS -
					Học Viện Công Nghệ. All rights reserved.
				</footer>
			</div>
		</Router>
	);
}
