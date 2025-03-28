import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-room", ({ roomId, user }) => {
    if (roomId && user) {
      socket.join(roomId);
      console.log(`${user} joined room: ${roomId}`);
      io.to(roomId).emit("user-joined", `${user} has joined the room.`);
    } else {
      console.log("Room ID or User is undefined");
    }
  });

  socket.on("send-message", ({ roomId, message, user }) => {
    io.to(roomId).emit("receive-message", { message, user });
  });
  
  

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
