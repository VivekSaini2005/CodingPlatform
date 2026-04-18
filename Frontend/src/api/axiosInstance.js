import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:4000", // 🔥 backend port
    baseURL: "https://codingplatform-tclb.onrender.com", // 🔥 backend port
    withCredentials: true,            // if using cookies / sessions
    headers: {
        "Content-Type": "application/json",
    },
});

// NO interceptor needed for localStorage as we use cookies with httponly
// withCredentials: true handles sending cookies automatically

export default axiosInstance;
