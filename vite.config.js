import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Đường dẫn base bắt buộc phải khớp với tên Repository của bạn trên GitHub
  base: "/my-react-app/",
})