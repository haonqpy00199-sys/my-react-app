import { useState } from "react";

export default function useCalculator() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([

    ]);
    const [isRad, setIsRad] = useState(false);
    const [ans, setAns] = useState("10");

    const insert = (val) => {
        if (input === "Lỗi") setInput(val);
        else setInput((prev) => prev + val);
    };

    const clearAll = () => setInput("");
    const clearHistory = () => setHistory([]);
    const backspace = () => {
        if (input === "Lỗi") setInput("");
        else setInput((prev) => prev.slice(0, -1));
    };
    const toggleRad = () => setIsRad(!isRad);

    const calculate = () => {
        if (!input.trim()) return;

        try {
            // 1. Tiền xử lý chuỗi: Đổi ký hiệu UI sang ký hiệu Toán học chuẩn
            let str = input
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/%/g, "/100")
                .replace(/ans/g, `(${ans})`)
                .replace(/π/g, "PI")
                .replace(/√/g, "sqrt")
                .replace(/\^/g, "**");

            // 2. Tự động chèn dấu nhân ẩn (VD: 2PI -> 2*PI, 5sin -> 5*sin, 3(2) -> 3*(2))
            str = str.replace(/(\d+)(PI|e|sin|cos|tan|arcsin|arccos|arctan|ln|log|abs|round|mean|stdev|stdevp|nPr|nCr|sqrt|\()/g, "$1*$2");
            str = str.replace(/\)(\d+|PI|e|sin|cos|tan|sqrt)/g, ")*$1");

            // 3. Xử lý Giai thừa (!) cơ bản cho số nguyên
            str = str.replace(/(\d+)!/g, "fact($1)");

            // 4. Tạo bối cảnh (Context) chứa các hàm Toán học nâng cao
            const toRad = (x) => (isRad ? x : x * (Math.PI / 180));
            const fromRad = (x) => (isRad ? x : x * (180 / Math.PI));

            const mathContext = {
                PI: Math.PI,
                e: Math.E,
                abs: Math.abs,
                round: Math.round,
                sqrt: Math.sqrt,
                ln: Math.log,
                log: Math.log10,

                // Lượng giác (Tự động thích ứng RAD / DEG)
                sin: (x) => Math.sin(toRad(x)),
                cos: (x) => Math.cos(toRad(x)),
                tan: (x) => Math.tan(toRad(x)),
                arcsin: (x) => fromRad(Math.asin(x)),
                arccos: (x) => fromRad(Math.acos(x)),
                arctan: (x) => fromRad(Math.atan(x)),

                // Xác suất thống kê
                fact: (n) => {
                    let res = 1;
                    for (let i = 2; i <= Math.floor(n); i++) res *= i;
                    return res;
                },
                nPr: function (n, r) { return this.fact(n) / this.fact(n - r); },
                nCr: function (n, r) { return this.fact(n) / (this.fact(r) * this.fact(n - r)); },

                // Thống kê (Mean, Stdev)
                mean: (...args) => args.reduce((a, b) => a + b, 0) / args.length,
                stdev: function (...args) {
                    const m = this.mean(...args);
                    return Math.sqrt(args.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / (args.length - 1 || 1));
                },
                stdevp: function (...args) {
                    const m = this.mean(...args);
                    return Math.sqrt(args.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / args.length);
                },
                nroot: (n, x) => Math.pow(x, 1 / n),
            };

            // 5. Thực thi tính toán an toàn qua new Function
            const argNames = Object.keys(mathContext);
            const argValues = Object.values(mathContext);
            const executor = new Function(...argNames, `return ${str};`);
            const resultVal = executor(...argValues);

            if (!isFinite(resultVal) || isNaN(resultVal)) throw new Error("Invalid");

            // Làm tròn đẹp mắt (tối đa 8 chữ số thập phân)
            const finalResult = Number.isInteger(resultVal)
                ? String(resultVal)
                : parseFloat(resultVal.toFixed(8)).toString();

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
        setInput,
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