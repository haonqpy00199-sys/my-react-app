import PropTypes from "prop-types";

// Chúng ta đã thêm thuộc tính `className` vào danh sách nhận (Destructuring)
function CalculatorButton({ label, onClick, className }) {
	// Định nghĩa các style cốt lõi không thay đổi (Vị trí chữ, độ đậm, transition)
	const baseStyles =
		"text-white font-bold rounded-lg shadow-md transition cursor-pointer active:scale-95";

	// Định nghĩa các style mặc định (Màu xanh) sẽ được dùng nếu KHÔNG truyền className vào
	const defaultStyles = "bg-sky-500 hover:bg-sky-600 py-3 px-6";

	return (
		<button
			type="button"
			onClick={onClick}
			// Kết hợp baseStyles với className truyền vào. Nếu không có className, dùng defaultStyles.
			className={`${baseStyles} ${className ? className : defaultStyles}`}
		>
			{label}
		</button>
	);
}

CalculatorButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string, // Đã thêm kiểm tra PropTypes cho className (Hợp lệ)
};

export default CalculatorButton;
