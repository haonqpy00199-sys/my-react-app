import { useState, useEffect } from "react";
import { fetchUsers } from "../services/api";
import UserCard from "../components/UserCard"; // Nhúng component UserCard vào

export default function Home() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await fetchUsers();
				setUsers(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
			<h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
				Trang Chủ
			</h1>

			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-100">
				<h2 className="text-2xl font-semibold mb-4 border-b pb-2">
					Danh sách Users
				</h2>

				{loading && (
					<p className="text-blue-500 animate-pulse text-center">
						Đang tải dữ liệu...
					</p>
				)}

				{error && (
					<div className="text-center py-4 bg-red-50 border border-red-200 rounded">
						<p className="text-red-500">⚠️ {error}</p>
						<button
							onClick={() => window.location.reload()}
							className="text-blue-500 underline mt-2 cursor-pointer"
						>
							Thử lại
						</button>
					</div>
				)}

				{!loading && !error && (
					<ul className="space-y-4">
						{users.map((user) => (
							// Gọi component UserCard và truyền dữ liệu user vào qua props
							<UserCard key={user.id} user={user} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
