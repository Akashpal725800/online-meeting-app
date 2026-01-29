const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const { nanoid } = require("nanoid");
const Meeting = require("./models/Meeting");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/meeting", require("./routes/meetingRoutes"));

// ================= DB =================
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(" Database connected"))
  .catch((err) => console.log("❌ DB error:", err));

// ================= SERVER =================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// store socket ↔ user mapping
const socketUserMap = {};

// ================= SOCKET =================
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // -------- JOIN MEETING --------
  socket.on("join_meeting", async ({ meetingId, name }) => {
    try {
      const meeting = await Meeting.findOne({ meetingId });
      if (!meeting) {
        return socket.emit("error", { message: "Meeting not found" });
      }

      // prevent same-name join
      const alreadyJoined = meeting.participants.some(
        (p) => p.name === name
      );

      if (alreadyJoined) {
        return socket.emit("error", {
          message: "Name already exists in meeting"
        });
      }

      socket.join(meetingId);

      meeting.participants.push({
        name,
        socketId: socket.id,
        joinedAt: new Date()
      });

      await meeting.save();

      socketUserMap[socket.id] = { meetingId, name };

      io.to(meetingId).emit("participant_joined", { name });

      console.log(`✅ ${name} joined ${meetingId}`);
    } catch (err) {
      console.log("Join error:", err);
    }
  });

  // -------- CREATE MEETING --------
  socket.on("create_meeting", async ({ title, hostName }) => {
    try {
      const meetingId = nanoid(10);

      const meeting = await Meeting.create({
        meetingId,
        title,
        hostName,
        participants: []
      });

      io.emit("new_meeting", meeting);
      socket.emit("meeting_created_success", meeting);

      console.log("🆕 Meeting created:", title);
    } catch (err) {
      socket.emit("meeting_creation_error", { message: err.message });
    }
  });

  // -------- DISCONNECT --------
  socket.on("disconnect", async () => {
    const user = socketUserMap[socket.id];
    if (!user) return;

    const { meetingId, name } = user;

    await Meeting.updateOne(
      { meetingId },
      { $pull: { participants: { name } } }
    );

    io.to(meetingId).emit("participant_left", { name });

    delete socketUserMap[socket.id];

    console.log(`❌ ${name} left ${meetingId}`);
  });
});

// ================= START =================
server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${process.env.PORT}`);
});
