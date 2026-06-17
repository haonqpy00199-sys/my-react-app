import { useState, useCallback, useEffect } from "react";

export default function useCalculator() {
    const [input, setInput] = useState("");

    // 1. Khởi tạo history: Đọc từ localStorage, nếu trống thì dùng mảng rỗng
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem("calc_history");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // 2. Khởi tạo isRad: Đọc từ localStorage để nhớ chế độ RAD/DEG
    const [isRad, setIsRad] = useState(() => {
        const savedRad = localStorage.getItem("calc_isRad");
        return savedRad === "true";
    });

    const [ans, setAns] = useState("10");

    // ==========================================
    // 3. TỰ ĐỘNG LƯU DỮ LIỆU (PERSISTENCE)
    // ==========================================

    // Lưu lịch sử mỗi khi có phép tính mới hoặc bị xóa
    useEffect(() => {
        localStorage.setItem("calc_history", JSON.stringify(history));
    }, [history]);

    // Lưu trạng thái RAD/DEG mỗi khi người dùng chuyển đổi
    useEffect(() => {
        localStorage.setItem("calc_isRad", String(isRad));
    }, [isRad]);

    // ==========================================
    // 4. CÁC HÀM XỬ LÝ ĐƯỢC TỐI ƯU (USECALLBACK)
    // ==========================================

    const insert = useCallback((val) => {
        setInput((prev) => (prev === "Lỗi" ? val : prev + val));
    }, []);

    const clearAll = useCallback(() => setInput(""), []);
    const clearHistory = useCallback(() => setHistory([]), []);

    const backspace = useCallback(() => {
        setInput((prev) => (prev === "Lỗi" ? "" : prev.slice(0, -1)));
    }, []);

    const toggleRad = useCallback(() => setIsRad((prev) => !prev), []);

    const calculate = useCallback(() => {
        if (!input.trim()) return;

        try {
            // Tiền xử lý chuỗi
            let str = input
                .replace(/×/g, "*").replace(/÷/g, "/")
                .replace(/%/g, "/100").replace(/ans/g, `(${ans})`)
                .replace(/π/g, "PI").replace(/√/g, "sqrt").replace(/\^/g, "**");

            // Thêm dấu nhân ẩn
            str = str.replace(/(\d+)(PI|e|sin|cos|tan|arcsin|arccos|arctan|ln|log|abs|round|mean|stdev|stdevp|nPr|nCr|sqrt|\()/g, "$1*$2");
            str = str.replace(/\)(\d+|PI|e|sin|cos|tan|sqrt)/g, ")*$1");

            // Xử lý Giai thừa
            str = str.replace(/(\d+)!/g, "fact($1)");

            const toRad = (x) => (isRad ? x : x * (Math.PI / 180));
            const fromRad = (x) => (isRad ? x : x * (180 / Math.PI));

            // Bộ Context Toán học
            const mathContext = {
                PI: Math.PI, e: Math.E, abs: Math.abs, round: Math.round, sqrt: Math.sqrt, ln: Math.log, log: Math.log10,
                sin: (x) => Math.sin(toRad(x)), cos: (x) => Math.cos(toRad(x)), tan: (x) => Math.tan(toRad(x)),
                arcsin: (x) => fromRad(Math.asin(x)), arccos: (x) => fromRad(Math.acos(x)), arctan: (x) => fromRad(Math.atan(x)),
                fact: (n) => { let res = 1; for (let i = 2; i <= Math.floor(n); i++) res *= i; return res; },
                nPr: function (n, r) { return this.fact(n) / this.fact(n - r); },
                nCr: function (n, r) { return this.fact(n) / (this.fact(r) * this.fact(n - r)); },
                mean: (...args) => args.reduce((a, b) => a + b, 0) / args.length,
                stdev: function (...args) { const m = this.mean(...args); return Math.sqrt(args.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / (args.length - 1 || 1)); },
                stdevp: function (...args) { const m = this.mean(...args); return Math.sqrt(args.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / args.length); },
                nroot: (n, x) => Math.pow(x, 1 / n),
            };

            // Thực thi tính toán an toàn
            const argNames = Object.keys(mathContext);
            const argValues = Object.values(mathContext);
            const executor = new Function(...argNames, `return ${str};`);
            const resultVal = executor(...argValues);

            if (!isFinite(resultVal) || isNaN(resultVal)) throw new Error("Invalid");

            // Làm tròn đẹp mắt
            const finalResult = Number.isInteger(resultVal) ? String(resultVal) : parseFloat(resultVal.toFixed(8)).toString();

            // Cập nhật state (useEffect sẽ tự động bắt sự thay đổi này và lưu vào localStorage)
            setHistory((prevHistory) => [...prevHistory, { id: Date.now(), expr: input, result: finalResult }]);
            setAns(finalResult);
            setInput("");
        } catch (error) {
            setInput("Lỗi");
            setTimeout(() => setInput(""), 1500);
        }
    }, [input, ans, isRad]);

    return {
        input, setInput, history, isRad, insert, clearAll, clearHistory, backspace, toggleRad, calculate,
    };
}