import { memo } from "react";
import PropTypes from "prop-types";

// Sử dụng memo() bao bọc toàn bộ component
const CalculatorButton = memo(function CalculatorButton({
	children,
	onClick,
	colSpan = 1,
	variant = "white",
}) {
	const baseStyles =
		"h-[52px] flex items-center justify-center rounded-[4px] cursor-pointer transition-all duration-75 border shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px] active:shadow-none font-medium select-none";

	const variants = {
		white: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-serif text-[1.1rem]",
		gray: "bg-[#e5e7eb] dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-[#d1d5db] dark:hover:bg-gray-600 text-xl font-normal",
		dark: "bg-[#9ca3af] dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:bg-[#6b7280] dark:hover:bg-gray-500 hover:text-white text-xl",
		blue: "bg-[#3b82f6] text-white border-blue-600 hover:bg-[#2563eb] text-3xl font-light",
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={`${baseStyles} ${variants[variant]} ${
				colSpan === 2 ? "col-span-2" : "col-span-1"
			}`}
		>
			{children}
		</button>
	);
});

CalculatorButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	colSpan: PropTypes.number,
	variant: PropTypes.oneOf(["white", "gray", "dark", "blue"]),
};

export default CalculatorButton;
