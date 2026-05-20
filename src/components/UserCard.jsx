export default function UserCard({ user }) {
	return (
		<li className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
			<p className="font-bold text-gray-800 text-lg">{user.name}</p>
			<p className="text-sm text-gray-600 mt-1">📧 {user.email}</p>
		</li>
	);
}
