import PropTypes from "prop-types";

export default function CalculatorButton({
	children,
	onClick,
	colSpan = 1,
	variant = "white",
}) {
	const baseStyles =
		"h-12 flex items-center justify-center rounded cursor-pointer transition-colors border border-gray-200/60 shadow-sm active:translate-y-px active:shadow-none text-lg select-none";

	const variants = {
		white: "bg-white text-gray-800 hover:bg-gray-100 font-serif",
		gray: "bg-[#d9d9d9] text-gray-800 hover:bg-[#cccccc]",
		dark: "bg-[#b8b8b8] text-gray-800 hover:bg-[#a0a0a0]",
		blue: "bg-[#2b6cb0] text-white hover:bg-[#255a92] text-2xl",
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

CalculatorButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	colSpan: PropTypes.number,
	variant: PropTypes.oneOf(["white", "gray", "dark", "blue"]),
};
