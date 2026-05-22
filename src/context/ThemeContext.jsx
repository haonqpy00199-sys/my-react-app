import { createContext, useState, useEffect } from "react";

// 1. Tạo Context
export const ThemeContext = createContext();

// 2. Tạo Provider (Nhà cung cấp dữ liệu)
export const ThemeProvider = ({ children }) => {
	// Lấy chế độ đã lưu từ lần trước (localStorage), mặc định là 'light'
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light",
	);

	// Mỗi khi theme thay đổi, cập nhật class vào thẻ html và lưu vào localStorage
	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
