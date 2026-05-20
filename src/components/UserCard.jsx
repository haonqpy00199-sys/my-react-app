import PropTypes from "prop-types"; // Thêm dòng này ở đầu file

export default function UserCard({ user }) {
	return (
		<li className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
			<p className="font-bold text-gray-800 text-lg">{user.name}</p>
			<p className="text-sm text-gray-600 mt-1">📧 {user.email}</p>
		</li>
	);
}

// Thêm quy ước dữ liệu (Prop Validation)
UserCard.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
};
