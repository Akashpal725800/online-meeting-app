<<<<<<< HEAD
# Online Meeting App

A full-stack **online meeting / video conferencing application** built with **React**, **Node.js**, **Express**, **Socket.io**, and **WebRTC**. The project uses **frontend and backend in the same repository** for simple development and testing.

---

## 📁 Project Structure

```
online-meeting-app/
│── .gitignore
│── README.md
│
├── backend/
│   ├── node_modules/ (ignored)
│   ├── .env (ignored)
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── node_modules/ (ignored)
    ├── .env (ignored)
    ├── package.json
    └── src/
```

---

## ✨ Features

* 🔴 Real-time video & audio communication (WebRTC)
* 💬 Real-time messaging using Socket.io
* 👥 Join meetings using a meeting ID
* 🔇 Mute / Unmute audio
* 🎥 Enable / Disable video
* 🌐 Full-stack architecture (Frontend + Backend)
* 🌍 Public testing support using **Ngrok**

---

## 🖥️ Frontend

**Tech Stack**

* React
* JavaScript
* Socket.io Client
* WebRTC
* CSS / Bootstrap

### ▶️ Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## ⚙️ Backend

**Tech Stack**

* Node.js
* Express.js
* Socket.io
* WebRTC
* MongoDB (optional)

### ▶️ Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 🌐 Ngrok (Public Access)

Ngrok is used to expose the local backend server to the internet for testing WebRTC and Socket.io.

```bash
ngrok http 5000
```

Update the generated Ngrok URL in your frontend socket or API configuration.

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder:

```
PORT=5000
MONGODB_URL=your_mongodb_connection_string
```

> ⚠️ `.env` and `node_modules` are ignored using `.gitignore`.

---

## 🚀 How to Run Full Project

1. Start backend server
2. Start frontend app
3. (Optional) Run Ngrok for public access
4. Open browser and join a meeting

---

## 📌 Git & Security

* `node_modules/` is ignored
* `.env` files are ignored
* Safe to push on GitHub

---

## 👨‍💻 Author

**Akash Kumar**

* GitHub: [https://github.com/Akashpal725800](https://github.com/Akashpal725800)
* LinkedIn: [https://www.linkedin.com/in/akash-pal-6910872a3/](https://www.linkedin.com/in/akash-pal-6910872a3/)

---

## 📄 License

This project is licensed under th
=======
# online-meeting-app
A full-stack online meeting application built with React, Node.js, Express, Socket.io, and WebRTC, supporting real-time video, audio, and messaging.
>>>>>>> ec1557a42e5dd249d69a030f8eb3acd7a3d1d670
