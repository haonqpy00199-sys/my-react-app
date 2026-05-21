import PropTypes from "prop-types";

export default function CalculatorButton({
	children,
	onClick,
	colSpan = 1,
	variant = "white",
}) {
	// Base styles: Căn giữa, bo góc nhẹ, hiệu ứng bấm nảy phím giống máy tính GeoGebra
	const baseStyles =
		"h-[52px] flex items-center justify-center rounded-[4px] cursor-pointer transition-all duration-75 border shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px] active:shadow-none font-medium select-none";

	// Bảng màu cho từng loại phím (Trắng, Xám nhạt, Xám đậm, Xanh)
	const variants = {
		white: "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 font-serif text-[1.1rem]",
		gray: "bg-[#e5e7eb] text-gray-800 border-gray-300 hover:bg-[#d1d5db] text-xl font-normal",
		dark: "bg-[#9ca3af] text-gray-900 border-gray-400 hover:bg-[#6b7280] hover:text-white text-xl",
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
}

// Bắt buộc xác thực kiểu dữ liệu để code chuyên nghiệp hơn
CalculatorButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	colSpan: PropTypes.number,
	variant: PropTypes.oneOf(["white", "gray", "dark", "blue"]),
};
