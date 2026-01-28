import { io } from "socket.io-client";

// 🔹 Socket connection: laptop → localhost, phone → ngrok
const SOCKET_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5005"
    : "https://unsegmentary-waniest-danika.ngrok-free.dev"; // replace with your ngrok HTTPS

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  secure: true,
});

export default socket;
