import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

// Thành phần Logo (Có thể tách ra file riêng nếu muốn)
const Logo = () => (
	<div className="flex flex-col items-start gap-1">
		<div className="flex items-center gap-3">
			{/* Icon Logo: Kết nối logic 3D */}
			<div className="relative w-12 h-12">
				<div className="absolute inset-0 bg-blue-500 rounded-full opacity-60 flex items-center justify-center border-2 border-blue-600/60 shadow-inner">
					<div className="w-2 h-2 bg-white rounded-full"></div>
				</div>
				<div className="absolute w-10 h-10 top-1 right-1 bg-orange-500 rounded-full opacity-70 flex items-center justify-center border-2 border-orange-600/70 shadow-inner">
					<div className="w-2 h-2 bg-white rounded-full"></div>
				</div>
				<div className="absolute w-6 h-0.5 bg-white top-6 left-6 rotate-[-15deg] rounded shadow-sm"></div>
				<div className="absolute w-1 h-1 bg-white top-5 left-5 rounded-full"></div>
				<div className="absolute w-1 h-1 bg-white top-7 left-10 rounded-full"></div>
			</div>
			<div className="flex flex-col">
				<span className="text-xl font-bold text-blue-900 tracking-tight">
					React Học Viện
				</span>
				<span className="text-xs text-blue-700/80 font-medium tracking-wide">
					Sổ Tay Học Tập
				</span>
			</div>
		</div>
	</div>
);

export default function App() {
	return (
		<Router basename="/my-react-app">
			<div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
				{/* --- REDESIGNED HEADER (NEW & IMPROVED) --- */}
				<header className="relative w-full bg-white border-b border-gray-100 shadow-sm overflow-hidden">
					{/* Lớp nền mờ công nghệ (Subtle Tech Background) */}
					<div className="absolute inset-0 opacity-[0.03]">
						<div className="absolute inset-0 bg-grid-pattern"></div>
						{/* Các khối hình học bay (Floating Shapes) */}
						<div className="absolute w-16 h-16 bg-blue-500/20 rounded-lg top-10 left-[15%] rotate-12"></div>
						<div className="absolute w-8 h-8 bg-orange-500/10 rounded-full top-24 left-[40%]"></div>
						<div className="absolute w-12 h-12 bg-blue-400/20 rounded-md top-8 right-[20%] -rotate-6"></div>
						<div className="absolute w-6 h-6 bg-orange-400/10 rounded-lg top-28 right-[45%] rotate-[-20deg]"></div>
					</div>

					{/* Nội dung Header chính (Main Header Content) */}
					<div className="max-w-7xl mx-auto px-6 py-8 relative flex items-center justify-between gap-10">
						{/* Vùng Logo (Left Side) */}
						<Logo />

						{/* Vùng Tiêu đề & Subtitle (Middle Side) */}
						<div className="flex flex-col items-center text-center">
							<h1 className="text-3xl font-extrabold tracking-tighter text-blue-950 uppercase">
								Hệ Thống Học Tập React JS Cơ Bản
							</h1>
							<p className="text-sm font-medium text-gray-600 mt-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100/60 shadow-inner">
								Lộ trình bài bản dành cho người mới bắt đầu
							</p>
						</div>

						{/* Thêm một số điểm nhấn công nghệ bên phải (Decorative Tech Points) */}
						<div className="flex items-center gap-3 opacity-60">
							<div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
							<div className="w-2.5 h-2.5 bg-orange-500 rounded-full delay-150 animate-pulse"></div>
							<div className="w-2.5 h-2.5 bg-blue-400 rounded-full delay-300 animate-pulse"></div>
						</div>
					</div>
				</header>
				{/* ---------------------------------------------- */}

				{/* 2. NAVIGATION MENU (Giữ nguyên vị trí) */}
				<Navbar />

				{/* 3. KHU VỰC NỘI DUNG CHÍNH CHỨA LAYOUT 3 CỘT */}
				<main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/calculator" element={<Calculator />} />
					</Routes>
				</main>

				{/* 4. FOOTER (Bổ sung dưới cùng hệ thống) */}
				<footer className="bg-gray-800 text-gray-400 text-center py-5 text-sm border-t border-gray-700">
					&copy; {new Date().getFullYear()} - Sổ Tay Học Tập ReactJS -
					Học Viện Công Nghệ. All rights reserved.
				</footer>
			</div>
		</Router>
	);
}
