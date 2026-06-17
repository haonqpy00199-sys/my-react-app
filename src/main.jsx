import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx"; // Import vào đây

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider>{" "}{/* Bao bọc ở đây */}
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
