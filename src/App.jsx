import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

export default function App() {
	return (
		// Thêm thuộc tính basename với giá trị là tên repository của bạn
		<Router basename="/my-react-app">
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/calculator" element={<Calculator />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}
