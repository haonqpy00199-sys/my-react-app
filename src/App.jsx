import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

export default function App() {
	return (
		<Router>
			<div className="min-h-screen flex flex-col">
				<Navbar /> {/* Gọi Navbar ở đây */}
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
