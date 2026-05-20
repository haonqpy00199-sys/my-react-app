# React Standard Calculator & Landing Page

Dự án này là một ứng dụng Web Single-Page Application (SPA) xây dựng bằng React và Vite, ứng dụng Tailwind CSS để thiết kế giao diện.

## Thông tin dự án

- **Tác giả:** Nguyễn Quốc Hào 
- **Công nghệ:** React 19, Vite, Tailwind CSS v4, React Router DOM v7.

## Các tính năng chính (Features)

1. **Routing:** Sử dụng `react-router-dom` để chuyển trang mượt mà không load lại trình duyệt.
2. **REST API Integration (Home Page):** - Tách biệt API call logic sang tầng Service (`src/services/api.js`).
    - Xử lý đầy đủ vòng đời API: Loading state, Error boundaries, Empty state.
3. **Advanced Calculator:**
    - Phép toán 2 ngôi cơ bản (+, -, \*, /).
    - Phép toán 1 ngôi (1/x, x², √x, %).
    - Quản lý bộ nhớ tạm (MC, MR, M+, M-, MS).

## Hướng dẫn cài đặt

1. Cài đặt các gói phụ thuộc: `npm install`
2. Khởi chạy server development: `npm run dev`
3. Build dự án để deploy: `npm run build`
