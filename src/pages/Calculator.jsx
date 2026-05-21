import { useEffect } from "react";
import useCalculator from "../hooks/useCalculator";
import CalculatorButton from "../components/CalculatorButton";

export default function Calculator() {
	const calc = useCalculator();

	// Tự động xóa trạng thái khi vừa vào trang
	useEffect(() => {
		calc.clearAll();
		calc.memoryOperation("MC"); // Reset memory
		calc.setHistory([]);
	}, []);

	// Định nghĩa các nhóm Style cho nút (CSS classes)
	const baseBtn =
		"rounded-lg text-white font-bold transition-all shadow-md active:scale-95";

	// Nhóm nút số: Nền xám sẫm
	const digitBtn = `${baseBtn} bg-[#363636] hover:bg-[#4d4d4d]`;

	// Nhóm nút Memory (MC, MR, ...): Nền vàng, chữ tối, font nhỏ hơn
	const specialBtn = `${baseBtn} bg-[#ccaa00] hover:bg-[#e6bf00] text-[#222] font-semibold text-xs py-2.5`;

	// Nhóm nút Xóa (AC, Del): Nền đỏ
	const deleteBtn = `${baseBtn} bg-[#e52e2e] hover:bg-[#ff4040]`;

	// Nhóm nút Toán tử (Cơ bản, 1 ngôi, ±, %): Nền xanh Pro
	const mathBtn = `${baseBtn} bg-[#007aff] hover:bg-[#1a8cff]`;

	return (
		<div className="flex flex-col lg:flex-row gap-6 my-2">
			{/* --- Calculator Main Area (Phần chính Máy tính) --- */}
			<div className="flex-grow flex items-center justify-center p-2">
				<div className="bg-[#2c2c2c] p-6 rounded-3xl shadow-xl w-full max-w-sm border border-[#444] transition-all hover:shadow-2xl">
					{/* Display Area: Nền gradient tối, text trắng */}
					<div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-5 rounded-2xl text-right mb-6 shadow-inner border border-[#333]">
						<div className="text-[#999] text-sm h-5 overflow-hidden text-ellipsis whitespace-nowrap font-mono tracking-tight">
							{calc.expression}
						</div>
						<div className="text-white text-4xl font-extrabold tracking-tight h-12 overflow-hidden text-ellipsis mt-1 font-sans">
							{calc.display === "Error"
								? calc.error
								: calc.display}
						</div>
					</div>

					{/* Button Grid - Sắp xếp đúng theo yêu cầu --- */}
					<div className="grid grid-cols-4 gap-3">
						{/* --- Memory Row --- */}
						<CalculatorButton
							label="MC"
							onClick={() => calc.memoryOperation("MC")}
							className={specialBtn}
						/>
						<CalculatorButton
							label="MR"
							onClick={() => calc.memoryOperation("MR")}
							className={specialBtn}
						/>
						<CalculatorButton
							label="M+"
							onClick={() => calc.memoryOperation("M+")}
							className={specialBtn}
						/>
						<CalculatorButton
							label="M-"
							onClick={() => calc.memoryOperation("M-")}
							className={specialBtn}
						/>

						{/* --- Unary Operators (Immediate) --- */}
						<CalculatorButton
							label="x²"
							onClick={() => calc.handleUnary("squared")}
							className={mathBtn}
						/>
						<CalculatorButton
							label="√"
							onClick={() => calc.handleUnary("squareRoot")}
							className={mathBtn}
						/>
						<CalculatorButton
							label="1/x"
							onClick={() => calc.handleUnary("reciprocal")}
							className={mathBtn}
						/>
						<CalculatorButton
							label="±"
							onClick={() => calc.handleNegate()}
							className={mathBtn}
						/>

						{/* --- Clear, Delete, Percent, Operators (Top) --- */}
						<CalculatorButton
							label="AC"
							onClick={() => calc.clearAll()}
							className={deleteBtn}
						/>
						<CalculatorButton
							label="Del"
							onClick={() => calc.clearLast()}
							className={deleteBtn}
						/>
						<CalculatorButton
							label="%"
							onClick={() => calc.handlePercent()}
							className={mathBtn}
						/>
						<CalculatorButton
							label="÷"
							onClick={() => calc.handleOperator("÷")}
							className={mathBtn}
						/>

						{/* --- Digit Grid Part 1 --- */}
						<CalculatorButton
							label="7"
							onClick={() => calc.appendDigit("7")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="8"
							onClick={() => calc.appendDigit("8")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="9"
							onClick={() => calc.appendDigit("9")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="×"
							onClick={() => calc.handleOperator("×")}
							className={mathBtn}
						/>

						{/* --- Digit Grid Part 2 --- */}
						<CalculatorButton
							label="4"
							onClick={() => calc.appendDigit("4")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="5"
							onClick={() => calc.appendDigit("5")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="6"
							onClick={() => calc.appendDigit("6")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="-"
							onClick={() => calc.handleOperator("-")}
							className={mathBtn}
						/>

						{/* --- Digit Grid Part 3 --- */}
						<CalculatorButton
							label="1"
							onClick={() => calc.appendDigit("1")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="2"
							onClick={() => calc.appendDigit("2")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="3"
							onClick={() => calc.appendDigit("3")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="+"
							onClick={() => calc.handleOperator("+")}
							className={mathBtn}
						/>

						{/* --- Bottom Row (Zero, Dot, Equals) --- */}
						<CalculatorButton
							label="0"
							onClick={() => calc.appendDigit("0")}
							className={digitBtn}
						/>
						<CalculatorButton
							label="."
							onClick={() => calc.appendDigit(".")}
							className={digitBtn}
						/>
						{/* Nút '=': Nền cam nổi bật, col-span-2 để chiếm 2 ô */}
						<CalculatorButton
							label="="
							onClick={() => calc.handleEquals()}
							className={`${baseBtn} col-span-2 bg-[#ff9500] hover:bg-[#ffaa33]`}
						/>
					</div>
				</div>
			</div>

			{/* --- Calculation History (Ghi lại lịch sử) --- */}
			<aside className="lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-h-[500px] overflow-y-auto">
				<div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
					<h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
						📜 Lịch sử tính toán
					</h3>
					<button
						onClick={() => calc.setHistory([])}
						className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:border-blue-200"
					>
						Xóa tất cả
					</button>
				</div>
				{calc.history.length === 0 ? (
					<p className="text-gray-500 text-sm text-center py-8 font-serif">
						Chưa có phép tính nào.
					</p>
				) : (
					<ul className="space-y-3 font-mono text-xs">
						{[...calc.history].reverse().map((item, index) => (
							<li
								key={index}
								className="bg-gray-50 p-3 rounded-md border border-gray-100 text-gray-800 break-all leading-relaxed shadow-inner"
							>
								{item}
							</li>
						))}
					</ul>
				)}
			</aside>
		</div>
	);
}
