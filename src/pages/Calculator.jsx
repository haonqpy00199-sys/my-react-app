import useCalculator from "./useCalculator"; // Import phần logic từ file trên

const Button = ({ children, onClick, className = "", variant = "default" }) => {
	const baseStyle =
		"flex items-center justify-center text-xl font-medium rounded shadow-sm border active:scale-95 transition-transform outline-none focus:outline-none";
	const variants = {
		default:
			"bg-gradient-to-b from-gray-100 to-gray-300 border-gray-400 text-gray-800 hover:from-gray-200 hover:to-gray-400",
		red: "bg-gradient-to-b from-red-500 to-red-700 border-red-800 text-white hover:from-red-600 hover:to-red-800",
		dark: "bg-gradient-to-b from-gray-600 to-gray-800 border-gray-900 text-white hover:from-gray-700 hover:to-gray-900",
		blue: "bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 text-white hover:from-blue-500 hover:to-blue-700",
	};
	return (
		<button
			onClick={onClick}
			className={`${baseStyle} ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	);
};

export default function Calculator() {
	// Lấy toàn bộ dữ liệu logic từ Custom Hook ra để dùng
	const {
		expression,
		display,
		appendNumber,
		appendDecimal,
		appendOperator,
		appendParenthesis,
		calculateUnary,
		calculate,
		backspace,
		clear,
	} = useCalculator();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
			<div className="w-full max-w-[340px] bg-white rounded-xl shadow-2xl border border-gray-300 p-4">
				{/* Màn hình hiển thị */}
				<div className="mb-4 bg-white border border-gray-300 rounded text-right shadow-inner px-3 py-2">
					<div className="text-gray-500 text-sm h-5 tracking-wider overflow-hidden whitespace-nowrap text-ellipsis">
						{expression}
					</div>
					<div className="text-4xl text-gray-800 overflow-hidden break-all h-10 flex items-center justify-end">
						{display}
					</div>
				</div>

				{/* Lưới các nút bấm */}
				<div className="grid grid-cols-4 gap-2">
					<Button
						className="h-12"
						variant="default"
						onClick={() => appendParenthesis("(")}
					>
						(
					</Button>
					<Button
						className="h-12"
						variant="default"
						onClick={() => appendParenthesis(")")}
					>
						)
					</Button>
					<Button className="h-12" variant="red" onClick={backspace}>
						←
					</Button>
					<Button className="h-12" variant="red" onClick={clear}>
						CA
					</Button>

					<Button
						className="h-12"
						variant="default"
						onClick={() => calculateUnary("x²")}
					>
						x²
					</Button>
					<Button
						className="h-12"
						variant="default"
						onClick={() => calculateUnary("√")}
					>
						√
					</Button>
					<Button
						className="h-12"
						variant="default"
						onClick={() => calculateUnary("%")}
					>
						%
					</Button>
					<Button
						className="h-12 text-2xl pb-1"
						variant="dark"
						onClick={() => appendOperator("÷")}
					>
						÷
					</Button>

					<Button className="h-12" onClick={() => appendNumber("7")}>
						7
					</Button>
					<Button className="h-12" onClick={() => appendNumber("8")}>
						8
					</Button>
					<Button className="h-12" onClick={() => appendNumber("9")}>
						9
					</Button>
					<Button
						className="h-12 text-2xl pb-1"
						variant="dark"
						onClick={() => appendOperator("×")}
					>
						×
					</Button>

					<Button className="h-12" onClick={() => appendNumber("4")}>
						4
					</Button>
					<Button className="h-12" onClick={() => appendNumber("5")}>
						5
					</Button>
					<Button className="h-12" onClick={() => appendNumber("6")}>
						6
					</Button>
					<Button
						className="h-12 text-3xl pb-2"
						variant="dark"
						onClick={() => appendOperator("-")}
					>
						-
					</Button>

					<Button className="h-12" onClick={() => appendNumber("1")}>
						1
					</Button>
					<Button className="h-12" onClick={() => appendNumber("2")}>
						2
					</Button>
					<Button className="h-12" onClick={() => appendNumber("3")}>
						3
					</Button>
					<Button
						className="h-12 text-2xl pb-1"
						variant="dark"
						onClick={() => appendOperator("+")}
					>
						+
					</Button>

					<Button className="h-12" onClick={() => appendNumber("0")}>
						0
					</Button>
					<Button
						className="h-12 font-bold pb-2"
						onClick={appendDecimal}
					>
						.
					</Button>
					<Button
						className="col-span-2 h-12 text-2xl pb-1"
						variant="blue"
						onClick={calculate}
					>
						=
					</Button>
				</div>
			</div>
		</div>
	);
}
