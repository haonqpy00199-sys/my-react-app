import { useState } from "react";

export default function useCalculator() {
    const [input, setInput] = useState("");
    // Lịch sử mẫu
    const [history, setHistory] = useState([
        { id: 1, expr: "2452 tan(125)", result: "-1917.612514" },
        { id: 2, expr: "551 × 9", result: "4959" },
    ]);
    const [isRad, setIsRad] = useState(false); // Trạng thái chuyển đổi RAD / DEG
    const [ans, setAns] = useState("4959"); // Lưu kết quả gần nhất

    const insert = (val) => {
        if (input === "Lỗi") setInput(val);
        else setInput((prev) => prev + val);
    };

    const clearAll = () => setInput("");

    // Hàm xóa toàn bộ lịch sử
    const clearHistory = () => setHistory([]);

    const backspace = () => {
        if (input === "Lỗi") setInput("");
        else setInput((prev) => prev.slice(0, -1));
    };

    const toggleRad = () => setIsRad(!isRad);

    const calculate = () => {
        if (!input.trim()) return;

        try {
            // Bước 1: Thay thế các ký hiệu UI thành các phép toán JS hiểu được
            let processed = input
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/π/g, "Math.PI")
                .replace(/ans/g, ans)
                .replace(/abs\(/g, "Math.abs(")
                .replace(/√\(/g, "Math.sqrt(")
                .replace(/\^2/g, "**2")
                .replace(/\^/g, "**");

            // Bước 2: Tự động chèn dấu nhân (VD: 2452 tan -> 2452 * tan, 5(2) -> 5 * (2))
            processed = processed.replace(/(\d+)\s*(sin|cos|tan|\(|Math)/g, "$1 * $2");

            // Bước 3: Xử lý Lượng giác & Đơn vị (Degree / Radian)
            const radMultiplier = isRad ? "1" : "(Math.PI / 180)";
            processed = processed.replace(/sin\(([^)]+)\)/g, `Math.sin(($1) * ${radMultiplier})`);
            processed = processed.replace(/cos\(([^)]+)\)/g, `Math.cos(($1) * ${radMultiplier})`);
            processed = processed.replace(/tan\(([^)]+)\)/g, `Math.tan(($1) * ${radMultiplier})`);

            // Bước 4: Thực thi biểu thức toán học
            const resultVal = new Function("return " + processed)();

            if (!isFinite(resultVal) || isNaN(resultVal)) throw new Error("Invalid");

            // Làm tròn 6 chữ số thập phân nếu là số lẻ, giữ nguyên nếu là số chẵn
            const finalResult = Number.isInteger(resultVal)
                ? String(resultVal)
                : Number(resultVal.toFixed(6)).toString();

            // Lưu vào lịch sử và xóa màn hình nhập
            setHistory([...history, { id: Date.now(), expr: input, result: finalResult }]);
            setAns(finalResult);
            setInput("");
        } catch (error) {
            setInput("Lỗi");
            setTimeout(() => setInput(""), 1500);
        }
    };

    return {
        input,
        history,
        isRad,
        insert,
        clearAll,
        clearHistory,
        backspace,
        toggleRad,
        calculate,
    };
}