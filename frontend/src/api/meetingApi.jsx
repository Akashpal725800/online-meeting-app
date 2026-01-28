// import axios from "axios";
// import socket from "../socket/socket";

// // 🔥 Auto-detect base URL (Laptop + Phone)
// const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:5005"
//     : `http://${window.location.hostname}:5005`;

// const API = axios.create({
//   baseURL: `${BASE_URL}/api/meeting`,
// });

// // -------- HTTP APIs --------
// export const createMeeting = (data) => API.post("/create", data);
// export const getMeetings = () => API.get("/");
// export const joinMeeting = (id, data) =>
//   API.post(`/join/${id}`, data);

// // -------- SOCKET --------
// export const joinMeetingSocket = (meetingId, name) => {
//   socket.emit("join_meeting", { meetingId, name });
// };

// export { socket };



import axios from "axios";
import socket from "../socket/socket";

// 🔥 Auto-detect base URL (Laptop + Phone + Ngrok)
let BASE_URL;

// Check if running on localhost
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  BASE_URL = "http://localhost:5005";
} else {
  // Use ngrok / network IP for phone access
  BASE_URL = `http://${window.location.hostname}:5005`;
}

// Optional: If using ngrok URL directly, uncomment below and replace your URL
// BASE_URL = "https://unsegmentary-waniest-danika.ngrok-free.dev";

const API = axios.create({
  baseURL: `${BASE_URL}/api/meeting`,
  timeout: 10000, // 10 seconds
});

// -------- HTTP APIs --------
export const createMeeting = (data) => API.post("/create", data);
export const getMeetings = () => API.get("/");
export const joinMeeting = (id, data) => API.post(`/join/${id}`, data);

// -------- SOCKET --------
export const joinMeetingSocket = (meetingId, name) => {
  socket.emit("join_meeting", { meetingId, name });
};

export { socket };


