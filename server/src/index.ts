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

  socket.on("join-room", ({ roomId, userName }) => {
    socket.join(roomId);
    console.log(`${userName} joined room: ${roomId}`);

    socket.to(roomId).emit("user-joined", userName);
  });

  socket.on("send-message", ({ roomId, message, userName }) => {
    console.log(`Message from ${userName} in room ${roomId}: ${message}`);
    io.to(roomId).emit("receive-message", `${userName}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
