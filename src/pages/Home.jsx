import { useState } from "react";

export default function Home() {
	// Trạng thái lưu trữ Giai đoạn học đang được chọn
	const [activeStage, setActiveStage] = useState(1);

	// Dữ liệu lộ trình được cấu trúc hóa từ tài liệu học tập của bạn
	const courseData = {
		1: {
			title: "Giai đoạn 1: Nắm vững nền tảng (Prerequisites) [cite: 2]",
			desc: "Trước khi chạm vào React, bạn cần chắc chắn mình đã làm chủ JavaScript, đặc biệt là các cú pháp hiện đại (ES6+), vì React sử dụng chúng rất nhiều. [cite: 3]",
			details: [
				"HTML/CSS: Nắm vững cấu trúc DOM, Flexbox, Grid và Responsive Design. [cite: 4]",
				"Khai báo biến: let, const. [cite: 6]",
				"Arrow Functions (Hàm mũi tên). [cite: 7]",
				"Template Literals (Chuỗi mẫu). [cite: 8]",
				"Destructuring (Xử lý phân rã Objects & Arrays). [cite: 9]",
				"Spread/Rest Operators (...). [cite: 10]",
				"Các phương thức xử lý mảng nâng cao: map(), filter(), reduce(). [cite: 11]",
				"Xử lý bất đồng bộ: Promises, Async/Await, Fetch API. [cite: 12]",
			],
			tip: "Đừng vội vã nhảy vào học React nếu bạn chưa thể tự tay viết và hiểu các hàm xử lý mảng như map() hay filter() nhé! [cite: 11]",
		},
		2: {
			title: "Giai đoạn 2: Các khái niệm cốt lõi của React [cite: 13]",
			desc: "Đây là bước làm quen với triết lý của React: chia nhỏ giao diện thành các thành phần (components) độc lập. [cite: 14]",
			details: [
				"JSX: Cú pháp đặc thù cho phép viết mã HTML trực tiếp bên trong JavaScript. [cite: 15]",
				"Hiểu cách JSX hoạt động đằng sau hậu trường và cách nhúng biểu thức JS. [cite: 16]",
				"Components: Tập trung hoàn toàn vào Functional Components hiện đại. [cite: 17]",
				"Props: Cơ chế truyền dữ liệu một chiều từ Component cha xuống Component con. [cite: 18]",
				"State: Trạng thái nội bộ của một Component; phân biệt rõ Props (bất biến) và State (khả biến). [cite: 19]",
				"Conditional Rendering: Hiển thị giao diện theo điều kiện linh hoạt (&& hoặc toán tử ba ngôi ? :). [cite: 21]",
				"List Rendering: Vòng lặp map() hiển thị danh sách đi kèm thuộc tính key bắt buộc. [cite: 22]",
				"Handling Events: Lắng nghe và xử lý sự kiện click, change, submit form... [cite: 23]",
			],
			tip: "Hãy bỏ qua Class Components nếu bạn mới học, tập trung 100% vào Functional Components vì đây là chuẩn viết code hiện nay. [cite: 17]",
		},
		3: {
			title: "Giai đoạn 3: Làm chủ React Hooks (Quan trọng nhất) [cite: 24]",
			desc: "Hooks là linh hồn của React hiện đại, cho phép bạn quản lý vòng đời và trạng thái trong Functional Components một cách mượt mà. [cite: 25]",
			details: [
				"useState: Hook cơ bản nhất giúp khởi tạo và cập nhật trạng thái giao diện. [cite: 26]",
				"useEffect: Quản lý các side effects như gọi API, thao tác trực tiếp với DOM, subscriptions. [cite: 27]",
				"Nắm vững dependency array ([]) để kiểm soát chặt chẽ thời điểm effect chạy lại. [cite: 28]",
				"useRef: Truy cập phần tử DOM hoặc lưu giá trị không gây re-render component. [cite: 29]",
				"Custom Hooks: Tự đóng gói các hooks riêng để tái sử dụng logic (ví dụ: useFetch). [cite: 30]",
			],
			tip: "Dependency array trong useEffect rất dễ gây ra vòng lặp vô tận (infinite loop) nếu bạn truyền sai tham số. Hãy kiểm tra kỹ!",
		},
		4: {
			title: "Giai đoạn 4: Quản lý Form và Routing [cite: 31]",
			desc: "Các ứng dụng thực tế luôn cần cơ chế điều hướng giữa các trang khác nhau và thu thập dữ liệu người dùng qua biểu mẫu. [cite: 32]",
			details: [
				"Routing (React Router v6): Thiết lập hệ thống định tuyến, router cơ bản cho ứng dụng. [cite: 33, 34]",
				"Truyền và trích xuất tham số động từ URL (URL Parameters). [cite: 35]",
				"Nested Routes: Kỹ thuật xây dựng cấu trúc các Route lồng nhau chuyên nghiệp. [cite: 36]",
				"Xử lý Form: Hiểu sâu về Controlled Components (quản lý giá trị input bằng state) và Uncontrolled. [cite: 38]",
				"Làm quen với các thư viện hỗ trợ xử lý form phức tạp và validate dữ liệu nhanh như React Hook Form. [cite: 39]",
			],
			tip: "React Router v6 có nhiều cải tiến lớn so với các phiên bản cũ, hãy đảm bảo bạn đọc đúng tài liệu v6. [cite: 33]",
		},
		5: {
			title: "Giai đoạn 5: Quản lý trạng thái toàn cục (Global State) [cite: 40]",
			desc: "Khi ứng dụng lớn lên, việc truyền Props qua quá nhiều lớp trung gian (Props Drilling) sẽ rất vất vả và gây rối loạn cấu trúc code. [cite: 41, 42]",
			details: [
				"Context API: Giải pháp quản lý state toàn cục được tích hợp sẵn của React, phù hợp cho các ứng dụng vừa và nhỏ. [cite: 43]",
				"Zustand hoặc Redux Toolkit: Các thư viện bổ trợ quản lý state độc lập bên ngoài cực kỳ mạnh mẽ. [cite: 44]",
				"Tập trung học Zustand vì nó hiện tại rất được ưa chuộng nhờ cú pháp đơn giản, nhẹ và dễ tiếp cận. [cite: 45]",
			],
			tip: "Hãy bắt đầu với Context API trước, khi dự án phức tạp hơn như e-commerce thì Zustand sẽ là lựa chọn tuyệt vời. [cite: 43, 45]",
		},
		6: {
			title: "Giai đoạn 6: Gọi API và Tích hợp hệ thống [cite: 46]",
			desc: "Kết nối ứng dụng frontend của bạn tới các hệ thống cơ sở dữ liệu backend. [cite: 47]",
			details: [
				"Sử dụng công cụ fetch mặc định hoặc thư viện Axios chuyên dụng để giao tiếp gửi/nhận dữ liệu. [cite: 47]",
				"Xử lý triệt để và đồng bộ các trạng thái bất đồng bộ khi gọi API: Loading, Success, Error. [cite: 48]",
				"Tìm hiểu React Query (TanStack Query) để tối ưu hóa quá trình caching và quản lý data fetching ở mức nâng cao. [cite: 49]",
			],
			tip: "Xử lý tốt các trạng thái Loading và Error sẽ giúp ứng dụng của bạn không bị crash và tăng điểm trải nghiệm người dùng (UX) rất cao! [cite: 48]",
		},
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-2">
			{/* --- CỘT TRÁI: MENU MỤC LỤC (Left Sidebar Content) --- */}
			<aside className="lg:col-span-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
				<h3 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
					📚 Lộ Trình Học
				</h3>
				<ul className="space-y-1">
					{Object.keys(courseData).map((key) => {
						const stageNum = parseInt(key);
						const isActive = activeStage === stageNum;
						return (
							<li key={key}>
								<button
									onClick={() => setActiveStage(stageNum)}
									className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
										isActive
											? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 pl-4 font-semibold"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									Giai đoạn {stageNum}
								</button>
							</li>
						);
					})}
				</ul>
			</aside>

			{/* --- CỘT GIỮA: NỘI DUNG CHI TIẾT (Main Content Area) --- */}
			<main className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
					{courseData[activeStage].title}
				</h2>
				<p className="text-gray-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-lg border-l-2 border-slate-300 italic text-sm">
					{courseData[activeStage].desc}
				</p>

				<h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-base">
					🎯 Kiến thức trọng tâm cần đạt:
				</h4>
				<ul className="space-y-3">
					{courseData[activeStage].details.map((detail, index) => (
						<li
							key={index}
							className="flex items-start gap-2 text-sm text-gray-700"
						>
							<span className="text-blue-500 mt-1 flex-shrink-0">
								✔
							</span>
							<span>{detail}</span>
						</li>
					))}
				</ul>
			</main>

			{/* --- CỘT PHẢI: GHI CHÚ BỔ TRỢ (Right Sidebar Content) --- */}
			<aside className="lg:col-span-1 bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl shadow-sm border border-amber-200 h-fit">
				<h3 className="font-bold text-amber-900 text-lg mb-3 flex items-center gap-2">
					💡 Mẹo Học Tập
				</h3>
				<p className="text-amber-800 text-sm leading-relaxed bg-white/60 p-3 rounded-lg border border-amber-200/50">
					{courseData[activeStage].tip}
				</p>
				<div className="mt-5 pt-4 border-t border-amber-200/60 text-xs text-amber-700/80">
					<p className="font-medium">📌 Lưu ý thực hành:</p>
					<p className="mt-1">
						Hãy vừa đọc lý thuyết vừa mở VS Code lên gõ lại trực
						tiếp để nhớ cú pháp lâu hơn.
					</p>
				</div>
			</aside>
		</div>
	);
}
