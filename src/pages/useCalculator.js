import { useState } from "react";

export default function useCalculator() {
    const [expression, setExpression] = useState("");
    const [display, setDisplay] = useState("0");
    const [isResetOnNext, setIsResetOnNext] = useState(false);

    // 1. Nhập số (0-9)
    const appendNumber = (num) => {
        if (isResetOnNext) {
            setExpression(num);
            setDisplay(num);
            setIsResetOnNext(false);
            return;
        }

        const expr = expression.trimEnd();
        if (expr === "") {
            setExpression(num);
            setDisplay(num);
        } else {
            const tokens = expr.split(" ");
            const lastToken = tokens[tokens.length - 1];

            if (!isNaN(lastToken) || lastToken.endsWith(".")) {
                if (lastToken === "0" && num === "0") return;
                const updatedToken = lastToken === "0" ? num : lastToken + num;
                tokens[tokens.length - 1] = updatedToken;
                setExpression(tokens.join(" "));
                setDisplay(updatedToken);
            } else {
                setExpression(expression + " " + num);
                setDisplay(num);
            }
        }
    };

    // 2. Nhập dấu chấm thập phân (.)
    const appendDecimal = () => {
        if (isResetOnNext) {
            setExpression("0.");
            setDisplay("0.");
            setIsResetOnNext(false);
            return;
        }

        const expr = expression.trimEnd();
        if (expr === "") {
            setExpression("0.");
            setDisplay("0.");
        } else {
            const tokens = expr.split(" ");
            const lastToken = tokens[tokens.length - 1];

            if (!isNaN(lastToken)) {
                if (lastToken.includes(".")) return;
                tokens[tokens.length - 1] = lastToken + ".";
                setExpression(tokens.join(" "));
                setDisplay(lastToken + ".");
            } else {
                setExpression(expression + " 0.");
                setDisplay("0.");
            }
        }
    };

    // 3. Nhập toán tử (+, -, ×, ÷)
    const appendOperator = (op) => {
        if (isResetOnNext) {
            setExpression(display + " " + op);
            setDisplay(op);
            setIsResetOnNext(false);
            return;
        }

        const expr = expression.trimEnd();
        if (expr === "") {
            if (op === "-") {
                setExpression("-");
                setDisplay("-");
            }
            return;
        }

        const tokens = expr.split(" ");
        const lastToken = tokens[tokens.length - 1];

        if (["+", "-", "×", "÷"].includes(lastToken)) {
            tokens[tokens.length - 1] = op;
            setExpression(tokens.join(" "));
        } else {
            setExpression(expr + " " + op);
        }
        setDisplay(op);
    };

    // 4. Nhập dấu ngoặc đơn ( hoặc )
    const appendParenthesis = (paren) => {
        if (isResetOnNext) {
            if (paren === "(") {
                setExpression("( ");
                setDisplay("(");
                setIsResetOnNext(false);
            }
            return;
        }

        const expr = expression.trimEnd();
        if (expr === "") {
            if (paren === "(") {
                setExpression("(");
                setDisplay("(");
            }
            return;
        }

        const tokens = expr.split(" ");
        const lastToken = tokens[tokens.length - 1];

        if (paren === "(") {
            if (!isNaN(lastToken) || lastToken === ")") {
                setExpression(expr + " × (");
            } else {
                setExpression(expr + " (");
            }
            setDisplay("(");
        } else if (paren === ")") {
            setExpression(expr + " )");
            setDisplay(")");
        }
    };

    // 5. Xử lý các phép tính nhanh đơn lẻ (x², √, %)
    const calculateUnary = (op) => {
        const expr = expression.trimEnd();
        if (expr === "") return;

        const tokens = expr.split(" ");
        const lastToken = tokens[tokens.length - 1];

        if (!isNaN(lastToken) && lastToken !== "") {
            const val = parseFloat(lastToken);
            let result;

            if (op === "%") result = val / 100;
            else if (op === "√") {
                if (val < 0) {
                    setDisplay("Error");
                    return;
                }
                result = Math.sqrt(val);
            } else if (op === "x²") {
                result = Math.pow(val, 2);
            }

            result = Math.round(result * 100000000) / 100000000;
            tokens[tokens.length - 1] = String(result);

            setExpression(tokens.join(" "));
            setDisplay(String(result));
        }
    };

    // 6. Tính toán toàn bộ biểu thức khi bấm nút "="
    const calculate = () => {
        const expr = expression.trimEnd();
        if (expr === "") return;

        let openBrackets = (expr.match(/\(/g) || []).length;
        let closeBrackets = (expr.match(/\)/g) || []).length;
        let balancedExpr = expr;
        while (openBrackets > closeBrackets) {
            balancedExpr += " )";
            closeBrackets++;
        }

        try {
            let toEval = balancedExpr.replace(/×/g, "*").replace(/÷/g, "/");
            const result = new Function("return " + toEval)();

            if (!isFinite(result) || isNaN(result)) {
                throw new Error("Invalid");
            }

            const finalResult = String(Math.round(result * 100000000) / 100000000);

            setExpression(balancedExpr);
            setDisplay(finalResult);
            setIsResetOnNext(true);
        } catch (error) {
            setDisplay("Error");
            setIsResetOnNext(true);
        }
    };

    // 7. Nút xóa lùi từng số (←)
    const backspace = () => {
        if (isResetOnNext) {
            clear();
            return;
        }

        let expr = expression.trimEnd();
        if (expr.length === 0) return;

        const tokens = expr.split(" ");
        let lastToken = tokens[tokens.length - 1];

        if (lastToken.length > 1 && (!isNaN(lastToken) || lastToken.includes("."))) {
            lastToken = lastToken.slice(0, -1);
            tokens[tokens.length - 1] = lastToken;
            setExpression(tokens.join(" ") + " ");
            setDisplay(lastToken);
        } else {
            tokens.pop();
            const newExpr = tokens.length > 0 ? tokens.join(" ") + " " : "";
            setExpression(newExpr);

            if (tokens.length > 0) {
                setDisplay(tokens[tokens.length - 1]);
            } else {
                setDisplay("0");
            }
        }
    };

    // 8. Làm sạch tất cả (CA)
    const clear = () => {
        setExpression("");
        setDisplay("0");
        setIsResetOnNext(false);
    };

    return {
        expression,
        display,
        appendNumber,
        appendDecimal,
        appendOperator,
        appendParenthesis,
        calculateUnary,
        calculate,
        backspace,
        clear
    };
}