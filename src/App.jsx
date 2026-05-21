import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

export default function App() {
	return (
		<Router basename="/my-react-app">
			<div className="min-h-screen flex flex-col bg-gray-50">
				{/* 1. HEADER (Thêm mới ở trên cùng) */}
				<header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-4 text-center shadow-md">
					<h1 className="text-3xl font-bold tracking-wide uppercase">
						Hệ Thống Học Tập React JS Cơ Bản
					</h1>
					<p className="text-blue-100 text-sm mt-1">
						Lộ trình bài bản dành cho người mới bắt đầu
					</p>
				</header>

				{/* 2. NAVIGATION MENU (Giữ nguyên vị trí) */}
				<Navbar />

				{/* 3. KHU VỰC NỘI DUNG CHÍNH CHỨA LAYOUT 3 CỘT */}
				<main className="flex-grow container mx-auto p-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/calculator" element={<Calculator />} />
					</Routes>
				</main>

				{/* 4. FOOTER (Bổ sung dưới cùng hệ thống) */}
				<footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm border-t border-gray-700">
					&copy; {new Date().getFullYear()} - Sổ Tay Học Tập ReactJS.
					All rights reserved.
				</footer>
			</div>
		</Router>
	);
}
