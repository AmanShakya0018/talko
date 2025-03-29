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

io.on("connection", (socket) => {
  const { userId, username } = socket.handshake.query;

  if (userId && username) {
    console.log(`User connected: ${username} (ID: ${userId})`);
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

  socket.on("send-message", async ({ message, roomId, }) => {
    try {
      if (message && userId && roomId) {
        await axios.post(`${process.env.CLIENT_URL}/api/messages`, {
          content: message,
          senderId: userId,
          senderName: username,
          roomId,
        });
  
        io.to(roomId).emit("receive-message", {
          senderId: userId,
          senderName: username,
          message,
        });
        console.log(`Message sent from ${username} to ${roomId}: ${message}`);
      } else {
        console.log("Message, User ID, or Receiver ID is missing");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });
  
  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is running on post ${PORT}`));
