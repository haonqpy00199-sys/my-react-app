import { useEffect, useRef } from "react";
import useCalculator from "../hooks/useCalculator";
import CalculatorButton from "../components/CalculatorButton";

export default function Calculator() {
	const calc = useCalculator();
	const historyEndRef = useRef(null);

	// Tự động cuộn xuống dưới cùng khi có phép tính mới
	useEffect(() => {
		historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [calc.history]);

	return (
		<div className="max-w-3xl mx-auto mt-4 border border-gray-400 shadow-xl bg-white flex flex-col font-sans mb-10">
			{/* --- LỊCH SỬ TÍNH TOÁN --- */}
			<div className="h-[300px] overflow-y-auto bg-white flex flex-col p-2">
				{calc.history.map((h) => (
					<div
						key={h.id}
						className="px-4 py-3 border-b border-gray-300 flex flex-col gap-3 font-serif text-[22px] tracking-wide"
					>
						<div className="text-gray-800">{h.expr}</div>
						<div className="text-right text-gray-900 font-medium">
							= {h.result}
						</div>
					</div>
				))}
				<div ref={historyEndRef} />
			</div>

			{/* --- Ô NHẬP LIỆU (ACTIVE INPUT) --- */}
			<div className="px-1 py-1 bg-white">
				<div className="border-[2.5px] border-[#3b82f6] h-[68px] flex items-center px-4 text-[22px] font-serif text-gray-800 bg-blue-50/20">
					{calc.input}
					<span className="w-[1.5px] h-8 bg-blue-500 animate-pulse ml-1 inline-block"></span>
				</div>
			</div>

			{/* --- THANH CÔNG CỤ (TOOLBAR) --- */}
			<div className="flex items-center justify-between bg-[#f0f0f0] px-4 py-2 border-t border-gray-300 text-sm">
				<div className="flex gap-6 text-gray-600 font-medium tracking-wide">
					<span className="text-[#3b82f6] border-b-[3px] border-[#3b82f6] pb-1 cursor-pointer font-bold">
						chính
					</span>
					<span className="cursor-pointer hover:text-gray-800 pt-0.5">
						abc
					</span>
					<span className="cursor-pointer hover:text-gray-800 pt-0.5">
						chức năng
					</span>
				</div>
				<div className="flex items-center gap-6">
					<div
						className="flex bg-gray-300 rounded border border-gray-300 cursor-pointer shadow-inner p-0.5"
						onClick={calc.toggleRad}
					>
						<span
							className={`px-3 py-1 rounded text-xs ${
								calc.isRad
									? "bg-white shadow-sm font-bold"
									: "text-gray-500"
							}`}
						>
							RAD
						</span>
						<span
							className={`px-3 py-1 rounded text-xs ${
								!calc.isRad
									? "bg-white shadow-sm font-bold"
									: "text-gray-500"
							}`}
						>
							DEG
						</span>
					</div>
					<button
						onClick={() => {
							calc.clearAll();
							calc.clearHistory();
						}}
						className="text-gray-500 hover:text-gray-800 cursor-pointer active:text-red-500 transition-colors"
					>
						xóa tất cả
					</button>
				</div>
			</div>

			{/* --- BÀN PHÍM (KEYPAD GRID 9 CỘT) --- */}
			<div className="bg-[#f0f0f0] p-2 grid grid-cols-9 gap-1.5 border-t border-gray-300">
				{/* Hàng 1 */}
				<CalculatorButton onClick={() => calc.insert("^2")}>
					a²
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("^")}>
					a^b
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("abs(")}>
					|a|
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("7")}
				>
					7
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("8")}
				>
					8
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("9")}
				>
					9
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("÷")}>
					÷
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("%")}>
					%
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("/")}>
					a/b
				</CalculatorButton>

				{/* Hàng 2 */}
				<CalculatorButton onClick={() => calc.insert("√(")}>
					√
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("nroot(")}>
					ⁿ√
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("π")}>
					π
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("4")}
				>
					4
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("5")}
				>
					5
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("6")}
				>
					6
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("×")}>
					×
				</CalculatorButton>
				<CalculatorButton variant="dark" onClick={() => {}}>
					←
				</CalculatorButton>
				<CalculatorButton variant="dark" onClick={() => {}}>
					→
				</CalculatorButton>

				{/* Hàng 3 */}
				<CalculatorButton onClick={() => calc.insert("sin(")}>
					sin
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("cos(")}>
					cos
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("tan(")}>
					tan
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("1")}
				>
					1
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("2")}
				>
					2
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("3")}
				>
					3
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("-")}>
					-
				</CalculatorButton>
				<CalculatorButton
					variant="dark"
					colSpan={2}
					onClick={calc.backspace}
				>
					⌫
				</CalculatorButton>

				{/* Hàng 4 */}
				<CalculatorButton onClick={() => calc.insert("(")}>
					(
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert(")")}>
					)
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert(",")}>
					,
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("0")}
				>
					0
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert(".")}
				>
					.
				</CalculatorButton>
				<CalculatorButton
					variant="gray"
					onClick={() => calc.insert("ans")}
				>
					ans
				</CalculatorButton>
				<CalculatorButton onClick={() => calc.insert("+")}>
					+
				</CalculatorButton>
				<CalculatorButton
					variant="blue"
					colSpan={2}
					onClick={calc.calculate}
				>
					↵
				</CalculatorButton>
			</div>
		</div>
	);
}
