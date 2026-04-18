import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance";

const resolvedSocketUrl =
	import.meta.env.VITE_SOCKET_URL ||
	axiosInstance.defaults.baseURL ||
	"http://localhost:4000";

export const socket = io(resolvedSocketUrl, {
	autoConnect: true,
	withCredentials: true,
	transports: ["websocket", "polling"]
});
