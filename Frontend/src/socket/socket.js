import { io } from "socket.io-client";

const URL = "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: true,
  withCredentials: true
});