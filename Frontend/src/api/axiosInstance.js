import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:4000", // 🔥 backend port
    withCredentials: true,            // if using cookies / sessions
    headers: {
        "Content-Type": "application/json",
    },
});

// NO interceptor needed for localStorage as we use cookies with httponly
// withCredentials: true handles sending cookies automatically

export default axiosInstance;
