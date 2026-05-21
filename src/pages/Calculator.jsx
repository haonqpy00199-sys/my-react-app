import { useEffect, useRef, useState } from "react";
import useCalculator from "../hooks/useCalculator";
import CalculatorButton from "../components/CalculatorButton";

export default function Calculator() {
	const calc = useCalculator();
	const historyEndRef = useRef(null);

	// Thêm State quản lý Tab đang mở (main | abc | func)
	const [activeTab, setActiveTab] = useState("main");

	// Tự động cuộn xuống dưới cùng khi có phép tính mới
	useEffect(() => {
		historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [calc.history]);

	// Hàm hỗ trợ đổi style cho Tab trên thanh công cụ
	const getTabClass = (tabName) => {
		return activeTab === tabName
			? "text-[#3b82f6] border-b-[3px] border-[#3b82f6] pb-1 cursor-pointer font-bold transition-all"
			: "cursor-pointer hover:text-gray-800 pt-0.5 transition-all text-gray-500";
	};

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
				<input
					type="text"
					value={calc.input}
					onChange={(e) => calc.setInput(e.target.value)}
					onKeyDown={(e) => {
						// Tự động tính toán khi người dùng bấm phím Enter
						if (e.key === "Enter") {
							e.preventDefault();
							calc.calculate();
						}
					}}
					placeholder="Nhập biểu thức..."
					className="w-full border-[2.5px] border-[#3b82f6] focus:border-[#2563eb] h-[68px] px-4 text-[22px] font-serif text-gray-800 bg-blue-50/20 outline-none rounded-[2px] transition-colors shadow-inner"
					autoFocus // Tự động trỏ chuột vào ô này khi vừa vào trang
					autoComplete="off"
					spellCheck="false"
				/>
			</div>

			{/* --- THANH CÔNG CỤ (TOOLBAR CÓ TAB) --- */}
			<div className="flex items-center justify-between bg-[#f0f0f0] px-4 py-2 border-t border-gray-300 text-sm">
				<div className="flex gap-6 text-gray-600 font-medium tracking-wide mt-1">
					<span
						className={getTabClass("main")}
						onClick={() => setActiveTab("main")}
					>
						chính
					</span>
					<span
						className={getTabClass("abc")}
						onClick={() => setActiveTab("abc")}
					>
						abc
					</span>
					<span
						className={getTabClass("func")}
						onClick={() => setActiveTab("func")}
					>
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
									? "bg-white shadow-sm font-bold text-gray-800"
									: "text-gray-500"
							}`}
						>
							RAD
						</span>
						<span
							className={`px-3 py-1 rounded text-xs ${
								!calc.isRad
									? "bg-white shadow-sm font-bold text-gray-800"
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
						className="text-gray-400 hover:text-gray-800 cursor-pointer active:text-red-500 transition-colors"
					>
						xóa tất cả
					</button>
				</div>
			</div>

			{/* --- CÁC BẢN BÀN PHÍM --- */}

			{/* 1. BÀN PHÍM CHÍNH (9 Cột) */}
			{activeTab === "main" && (
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
			)}

			{/* 2. BÀN PHÍM ABC (QWERTY) */}
			{activeTab === "abc" && (
				<div className="bg-[#e4e4e4] p-2 flex flex-col gap-2 border-t border-gray-300">
					{/* Hàng 1 (10 phím) */}
					<div className="grid grid-cols-10 gap-1.5">
						{["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
							(k) => (
								<CalculatorButton
									key={k}
									onClick={() => calc.insert(k)}
								>
									{k}
								</CalculatorButton>
							),
						)}
					</div>
					{/* Hàng 2 (9 phím - thụt lề 2 bên) */}
					<div className="grid grid-cols-9 gap-1.5 px-[4.5%]">
						{["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
							(k) => (
								<CalculatorButton
									key={k}
									onClick={() => calc.insert(k)}
								>
									{k}
								</CalculatorButton>
							),
						)}
					</div>
					{/* Hàng 3 */}
					<div className="grid grid-cols-10 gap-1.5">
						<CalculatorButton
							variant="dark"
							onClick={() => calc.insert("=")}
						>
							=
						</CalculatorButton>
						{["z", "x", "c", "v", "b", "n", "m", ","].map((k) => (
							<CalculatorButton
								key={k}
								onClick={() => calc.insert(k)}
							>
								{k}
							</CalculatorButton>
						))}
						<CalculatorButton
							variant="dark"
							onClick={calc.backspace}
						>
							⌫
						</CalculatorButton>
					</div>
					{/* Hàng 4 */}
					<div className="grid grid-cols-10 gap-1.5">
						<CalculatorButton variant="dark" onClick={() => {}}>
							⇧
						</CalculatorButton>
						{["(", ")", "[", "]", "!", "'", "π"].map((k) => (
							<CalculatorButton
								key={k}
								onClick={() => calc.insert(k)}
							>
								{k}
							</CalculatorButton>
						))}
						<CalculatorButton
							variant="blue"
							colSpan={2}
							onClick={calc.calculate}
						>
							↵
						</CalculatorButton>
					</div>
				</div>
			)}

			{/* 3. BÀN PHÍM CHỨC NĂNG (6 Cột) */}
			{activeTab === "func" && (
				<div className="bg-[#f0f0f0] p-2 grid grid-cols-6 gap-1.5 border-t border-gray-300">
					{/* Hàng 1 */}
					<CalculatorButton onClick={() => calc.insert("sin(")}>
						sin
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("cos(")}>
						cos
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("tan(")}>
						tan
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("^")}>
						a^b
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("√(")}>
						√
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("nroot(")}>
						ⁿ√
					</CalculatorButton>

					{/* Hàng 2 */}
					<CalculatorButton onClick={() => calc.insert("arcsin(")}>
						sin⁻¹
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("arccos(")}>
						cos⁻¹
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("arctan(")}>
						tan⁻¹
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("e^")}>
						eˣ
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("abs(")}>
						abs
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("round(")}>
						round
					</CalculatorButton>

					{/* Hàng 3 */}
					<CalculatorButton onClick={() => calc.insert("mean(")}>
						mean
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("stdev(")}>
						stdev
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("stdevp(")}>
						stdevp
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("ln(")}>
						ln
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("log(")}>
						log
					</CalculatorButton>
					<CalculatorButton variant="dark" onClick={calc.backspace}>
						⌫
					</CalculatorButton>

					{/* Hàng 4 */}
					<CalculatorButton onClick={() => calc.insert("nPr(")}>
						nPr
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("nCr(")}>
						nCr
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("!")}>
						!
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("e")}>
						e
					</CalculatorButton>
					<CalculatorButton onClick={() => calc.insert("π")}>
						π
					</CalculatorButton>
					<CalculatorButton variant="blue" onClick={calc.calculate}>
						↵
					</CalculatorButton>
				</div>
			)}
		</div>
	);
}
