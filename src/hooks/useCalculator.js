import { useState } from "react";

// Định nghĩa các ký hiệu toán học đẹp mắt và giá trị tính toán thực tế của chúng
const MATH_SYMBOLS = {
    "+": "+",
    "-": "-",
    "×": "*",
    "÷": "/",
};

const useCalculator = () => {
    // Trạng thái hiển thị tiêu chuẩn
    const [display, setDisplay] = useState("0"); // Số đang nhập hoặc kết quả
    const [expression, setExpression] = useState(""); // Phép tính đầy đủ đang thực hiện
    const [operand1, setOperand1] = useState(null); // Số thứ nhất
    const [operator, setOperator] = useState(null); // Toán tử (+, -, ...)
    const [error, setError] = useState(null); // Trạng thái lỗi (ví dụ: Zero Division)

    // Các trạng thái đặc biệt
    const [isNewOperand, setIsNewOperand] = useState(true); // Cờ để xóa màn hình cho số tiếp theo
    const [waitingForOperand2, setWaitingForOperand2] = useState(false); // Đang đợi số thứ 2
    const [memory, setMemory] = useState(0); // Giá trị trong bộ nhớ (MC, MR, M+, M-)
    const [history, setHistory] = useState([]); // Lịch sử tính toán

    // Hàm bổ trợ: Định dạng số đẹp hơn cho hiển thị (có dấu phẩy)
    const formatNumber = (num) => {
        if (isNaN(num)) return "Error";
        return new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 }).format(num);
    };

    // --- 1. Nhập số & Dấu chấm ---
    const appendDigit = (digit) => {
        if (error) clearAll(); // Reset nếu có lỗi trước đó
        if (isNewOperand || display === "0") {
            if (digit === ".") {
                setDisplay("0."); // Nếu bấm '.', hiện '0.' thay vì '.'
            } else {
                setDisplay(digit);
            }
            setIsNewOperand(false);
        } else {
            if (digit === "." && display.includes(".")) return; // Chỉ cho phép 1 dấu chấm
            setDisplay(display + digit);
        }
    };

    // --- 2. Toán tử cơ bản (+, -, ×, ÷) ---
    const handleOperator = (opLabel) => {
        if (error) return;
        const currentInput = parseFloat(display);

        if (operand1 !== null && operator && !waitingForOperand2) {
            // Tự động tính toán nếu đã có op1, operator, và op2 đã được nhập xong
            calculate();
            const result = parseFloat(display);
            setOperand1(result); // Đặt kết quả làm op1 cho phép tính tiếp theo
            setOperator(opLabel);
            setExpression(`${formatNumber(result)} ${opLabel}`);
            setWaitingForOperand2(true);
            setIsNewOperand(true);
        } else {
            // Thiết lập toán tử đầu tiên
            setOperand1(currentInput);
            setOperator(opLabel);
            setExpression(`${formatNumber(currentInput)} ${opLabel}`);
            setWaitingForOperand2(true);
            setIsNewOperand(true);
        }
    };

    // --- 3. Toán tử 1 ngôi (Immediate) (x², √, 1/x) ---
    const handleUnary = (unaryType) => {
        if (error) return;
        const currentNum = parseFloat(display);
        let result;
        let exprStr;

        switch (unaryType) {
            case "squared": // x²
                result = currentNum * currentNum;
                exprStr = `sqr(${formatNumber(currentNum)})`;
                break;
            case "squareRoot": // √
                if (currentNum < 0) {
                    setError("Negative Root");
                    setDisplay("Error");
                    return;
                }
                result = Math.sqrt(currentNum);
                exprStr = `sqrt(${formatNumber(currentNum)})`;
                break;
            case "reciprocal": // 1/x
                if (currentNum === 0) {
                    setError("Zero Division");
                    setDisplay("Error");
                    return;
                }
                result = 1 / currentNum;
                exprStr = `1/(${formatNumber(currentNum)})`;
                break;
            default:
                return;
        }

        setDisplay(String(result));
        setExpression(exprStr);
        setIsNewOperand(true);
    };

    // --- 4. Các toán tử đặc biệt khác ---
    const handleNegate = () => { // ± (đổi dấu)
        if (error) return;
        setDisplay(String(parseFloat(display) * -1));
    };

    const handlePercent = () => { // % (chia 100)
        if (error) return;
        const currentInput = parseFloat(display);
        setDisplay(String(currentInput / 100));
        setIsNewOperand(true);
    };

    // --- 5. Logic tính toán chính (cho =) ---
    const calculate = () => {
        if (error || !operator || operand1 === null || !waitingForOperand2) return;
        const operand2 = parseFloat(display);
        let result;

        // Lấy ký hiệu toán học thực tế
        const opMath = MATH_SYMBOLS[operator];

        try {
            switch (opMath) {
                case "+":
                    result = operand1 + operand2;
                    break;
                case "-":
                    result = operand1 - operand2;
                    break;
                case "*":
                    result = operand1 * operand2;
                    break;
                case "/":
                    if (operand2 === 0) throw new Error("Zero Division");
                    result = operand1 / operand2;
                    break;
                default:
                    return;
            }

            if (!isFinite(result)) throw new Error("Infinity Result");

            // Định dạng phép tính đầy đủ để hiển thị và lưu lịch sử
            const fullExpr = `${formatNumber(operand1)} ${operator} ${formatNumber(operand2)}`;
            setDisplay(String(result));
            setExpression(""); // Xóa expression trên cùng sau khi bấm =
            setOperand1(null);
            setOperator(null);
            setWaitingForOperand2(false);
            setIsNewOperand(true);
            setHistory([...history, `${fullExpr} = ${formatNumber(result)}`]);
        } catch (err) {
            setError(err.message);
            setDisplay("Error");
        }
    };

    const handleEquals = () => {
        calculate();
    };

    // --- 6. Xóa / Xóa một ký tự ---
    const clearAll = () => { // AC (All Clear)
        setDisplay("0");
        setExpression("");
        setOperand1(null);
        setOperator(null);
        setError(null);
        setWaitingForOperand2(false);
        setIsNewOperand(true);
    };

    const clearLast = () => { // Del (Delete)
        if (error) {
            clearAll();
            return;
        }
        if (isNewOperand || display === "Error" || display === "Infinity") {
            setDisplay("0");
        } else {
            setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
        }
    };

    // --- 7. Bộ nhớ (Memory - MC, MR, M+, M-) ---
    const memoryOperation = (type) => {
        if (error) return;
        const currentNum = parseFloat(display);
        switch (type) {
            case "MC": // Memory Clear (Xóa bộ nhớ)
                setMemory(0);
                break;
            case "MR": // Memory Recall (Lấy lại bộ nhớ)
                setDisplay(String(memory));
                setIsNewOperand(true);
                break;
            case "M+": // Memory Add (Cộng vào bộ nhớ)
                setMemory(memory + currentNum);
                setIsNewOperand(true);
                break;
            case "M-": // Memory Subtract (Trừ khỏi bộ nhớ)
                setMemory(memory - currentNum);
                setIsNewOperand(true);
                break;
            default:
                return;
        }
    };

    return {
        display,
        expression,
        error,
        memory,
        history,
        appendDigit,
        handleOperator,
        handleUnary,
        handleNegate,
        handlePercent,
        handleEquals,
        clearAll,
        clearLast,
        memoryOperation,
        setHistory,
        formatNumber,
    };
};

export default useCalculator;