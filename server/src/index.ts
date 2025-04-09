import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
const onlineUsers = new Map();

io.on("connection", (socket) => {
  const { userId, username } = socket.handshake.query;

  if (userId && username) {
    onlineUsers.set(userId, { username, socketId: socket.id });
    io.emit("online-users", Array.from(onlineUsers.values()));
    console.log(`User connected: ${username} (ID: ${userId})`);
    socket.emit("connected");
  } else {
    console.log("User connected without ID or username");
    return;
  }

  socket.on("join-room", ({ roomId }) => {
    if (roomId && userId && username) {
      socket.join(roomId);
      console.log(`${username} joined room: ${roomId} (ID: ${userId})`);
      io.to(roomId).emit("user-joined", `${username} has joined the room.`);
    } else {
      console.log("Room ID, User ID, or Username is missing");
    }
  });

  socket.on("typing", ({ roomId, senderName }) => {
    socket.to(roomId).emit("user-typing", { senderName });
  });

  socket.on("stop-typing", ({ roomId, senderName }) => {
    socket.to(roomId).emit("user-stopped-typing", { senderName });
  });

  socket.on("send-message", async ({ message, roomId, }) => {
    try {
      if (message && userId && roomId) {
        await axios.post(`${process.env.CLIENT_URL}/api/messages`, {
          content: message,
          senderId: userId,
          senderName: username,
          roomId,
        });
        const createdAt = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        io.to(roomId).emit("receive-message", {
          senderId: userId,
          senderName: username,
          message,
          createdAt,
        });
        console.log(`Message sent from ${username} to ${roomId}: ${message}`);
      } else {
        console.log("Message, User ID, or Receiver ID is missing");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("clear-chat", ({ roomId }) => {
    socket.to(roomId).emit("chat-cleared");
  });
  
  
  socket.on("disconnect", () => {
    onlineUsers.forEach((user, key) => {
      if (user.socketId === socket.id) {
        onlineUsers.delete(key);
      }
    });

    io.emit("online-users", Array.from(onlineUsers.values()));
    console.log(`Disconnected: ${socket.id}`);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is running on post ${PORT}`));
