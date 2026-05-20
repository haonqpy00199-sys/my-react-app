export default function CalculatorButton({
	children,
	onClick,
	variant = "num",
	disabled = false,
	className = "",
}) {
	const baseClass =
		"p-4 rounded transition active:scale-95 flex items-center justify-center cursor-pointer";

	// Định nghĩa màu sắc theo loại nút
	const variants = {
		num: "bg-white hover:bg-gray-100 text-2xl font-normal", // Nút số (trắng)
		op: "bg-[#f9f9f9] hover:bg-gray-100 text-xl font-light text-gray-800", // Nút phép toán (xám)
		equal: "bg-[#0067c0] text-white hover:bg-[#005da9] text-3xl font-light", // Nút dấu = (xanh)
	};

	return (
		<button
			className={`${baseClass} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
