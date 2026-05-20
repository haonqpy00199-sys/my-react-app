export const fetchUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Lỗi kết nối đến máy chủ API");
        const data = await response.json();
        return data.slice(0, 3);
    } catch (error) {
        throw error;
    }
};