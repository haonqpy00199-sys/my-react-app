import { useState } from "react";
import CalculatorButton from "../components/CalculatorButton"; // Nhúng Component nút bấm vào

export default function Calculator() {
	const [currentOperand, setCurrentOperand] = useState("0");
	const [previousOperand, setPreviousOperand] = useState("");
	const [operation, setOperation] = useState("");
	const [overwrite, setOverwrite] = useState(true);
	const [memory, setMemory] = useState(0);

	const appendNumber = (number) => {
		if (currentOperand.includes(".") && number === ".") return;
		if (overwrite) {
			setCurrentOperand(number === "." ? "0." : number);
			setOverwrite(false);
		} else {
			if (currentOperand === "0" && number !== ".") {
				setCurrentOperand(number);
			} else {
				setCurrentOperand(`${currentOperand}${number}`);
			}
		}
	};

	const chooseOperation = (op) => {
		if (currentOperand === "") return;
		if (previousOperand !== "") {
			calculate();
		}
		setOperation(op);
		setPreviousOperand(`${currentOperand} ${op}`);
		setOverwrite(true);
	};

	const calculate = () => {
		let cal;
		const prev = parseFloat(previousOperand);
		const current = parseFloat(currentOperand);

		if (isNaN(prev) || isNaN(current)) return;

		switch (operation) {
			case "+":
				cal = prev + current;
				break;
			case "-":
				cal = prev - current;
				break;
			case "×":
				cal = prev * current;
				break;
			case "÷":
				if (current === 0) {
					alert("Không thể chia cho 0!");
					clear();
					return;
				}
				cal = prev / current;
				break;
			default:
				return;
		}

		setPreviousOperand(`${previousOperand} ${currentOperand} =`);
		setCurrentOperand(String(cal));
		setOperation("");
		setOverwrite(true);
	};

	const clear = () => {
		setCurrentOperand("0");
		setPreviousOperand("");
		setOperation("");
		setOverwrite(true);
	};

	const clearEntry = () => {
		setCurrentOperand("0");
		setOverwrite(true);
	};

	const backspace = () => {
		if (overwrite) return;
		if (currentOperand.length === 1) {
			setCurrentOperand("0");
			setOverwrite(true);
		} else {
			setCurrentOperand(currentOperand.slice(0, -1));
		}
	};

	const toggleSign = () => {
		setCurrentOperand(String(parseFloat(currentOperand) * -1));
	};

	const calculateSingle = (op) => {
		if (currentOperand === "") return;
		const current = parseFloat(currentOperand);
		if (isNaN(current)) return;

		let result;
		switch (op) {
			case "1/x":
				result = current === 0 ? "Lỗi" : 1 / current;
				break;
			case "x²":
				result = current * current;
				break;
			case "√x":
				result = current < 0 ? "Lỗi" : Math.sqrt(current);
				break;
			case "%":
				result = current / 100;
				break;
			default:
				return;
		}
		setCurrentOperand(String(result));
		setOverwrite(true);
	};

	const handleMemory = (action) => {
		const current = parseFloat(currentOperand) || 0;
		switch (action) {
			case "MC":
				setMemory(0);
				break;
			case "MR":
				setCurrentOperand(String(memory));
				setOverwrite(true);
				break;
			case "M+":
				setMemory(memory + current);
				setOverwrite(true);
				break;
			case "M-":
				setMemory(memory - current);
				setOverwrite(true);
				break;
			case "MS":
				setMemory(current);
				setOverwrite(true);
				break;
			default:
				return;
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
			<div className="bg-[#f3f3f3] w-full max-w-sm rounded-lg shadow-2xl border border-gray-200 overflow-hidden text-gray-900 font-sans">
				{/* Tiêu đề ứng dụng */}
				<div className="flex justify-between items-center px-4 py-2 bg-[#f3f3f3]">
					<div className="flex items-center gap-3">
						<button className="text-gray-600 hover:text-black cursor-pointer">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<h2 className="text-xl font-semibold">Standard</h2>
					</div>
					<button className="text-gray-600 hover:text-black cursor-pointer">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>

				{/* Màn hình hiển thị kết quả */}
				<div className="bg-[#f3f3f3] p-6 text-right border-b border-gray-200">
					<div className="text-gray-600 text-sm h-6 overflow-hidden">
						{previousOperand}
					</div>
					<div className="text-5xl font-bold h-16 overflow-hidden break-all">
						{currentOperand}
					</div>
				</div>

				{/* Hàng nút chức năng Memory */}
				<div className="grid grid-cols-6 gap-0.5 text-xs text-center py-1 bg-[#f3f3f3]">
					{["MC", "MR", "M+", "M-", "MS", "M∨"].map((mem) => (
						<button
							key={mem}
							className="py-2 text-gray-500 hover:bg-gray-200 font-medium rounded transition active:scale-95 disabled:opacity-50 cursor-pointer"
							onClick={() => mem !== "M∨" && handleMemory(mem)}
							disabled={mem === "M∨"}
						>
							{mem}
						</button>
					))}
				</div>

				{/* Lưới các nút bấm tính toán - Đã được làm sạch bằng component */}
				<div className="grid grid-cols-4 gap-[2px] p-[2px] bg-gray-200">
					{/* Hàng 1 */}
					<CalculatorButton
						variant="op"
						onClick={() => calculateSingle("%")}
					>
						%
					</CalculatorButton>
					<CalculatorButton variant="op" onClick={clearEntry}>
						CE
					</CalculatorButton>
					<CalculatorButton variant="op" onClick={clear}>
						C
					</CalculatorButton>
					<CalculatorButton variant="op" onClick={backspace}>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414A2 2 0 0010.828 19h7.172a2 2 0 002-2V7a2 2 0 00-2-2h-7.172a2 2 0 00-1.414.586L3 12z"
							/>
						</svg>
					</CalculatorButton>

					{/* Hàng 2 */}
					<CalculatorButton
						variant="op"
						onClick={() => calculateSingle("1/x")}
					>
						<sup>1</sup>/<sub>x</sub>
					</CalculatorButton>
					<CalculatorButton
						variant="op"
						onClick={() => calculateSingle("x²")}
					>
						x<sup>2</sup>
					</CalculatorButton>
					<CalculatorButton
						variant="op"
						onClick={() => calculateSingle("√x")}
					>
						<sup>2</sup>√x
					</CalculatorButton>
					<CalculatorButton
						variant="op"
						className="text-2xl"
						onClick={() => chooseOperation("÷")}
					>
						÷
					</CalculatorButton>

					{/* Hàng 3 */}
					<CalculatorButton onClick={() => appendNumber("7")}>
						7
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("8")}>
						8
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("9")}>
						9
					</CalculatorButton>
					<CalculatorButton
						variant="op"
						className="text-2xl"
						onClick={() => chooseOperation("×")}
					>
						×
					</CalculatorButton>

					{/* Hàng 4 */}
					<CalculatorButton onClick={() => appendNumber("4")}>
						4
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("5")}>
						5
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("6")}>
						6
					</CalculatorButton>
					<CalculatorButton
						variant="op"
						className="text-3xl"
						onClick={() => chooseOperation("-")}
					>
						-
					</CalculatorButton>

					{/* Hàng 5 */}
					<CalculatorButton onClick={() => appendNumber("1")}>
						1
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("2")}>
						2
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("3")}>
						3
					</CalculatorButton>
					<CalculatorButton
						variant="op"
						className="text-2xl"
						onClick={() => chooseOperation("+")}
					>
						+
					</CalculatorButton>

					{/* Hàng 6 */}
					<CalculatorButton onClick={toggleSign}>
						<sup>+</sup>/<sub>-</sub>
					</CalculatorButton>
					<CalculatorButton onClick={() => appendNumber("0")}>
						0
					</CalculatorButton>
					<CalculatorButton
						className="text-2xl"
						onClick={() => appendNumber(".")}
					>
						.
					</CalculatorButton>
					<CalculatorButton variant="equal" onClick={calculate}>
						=
					</CalculatorButton>
				</div>
			</div>
		</div>
	);
}
