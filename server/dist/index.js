"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const onlineUsers = new Map();
io.on("connection", (socket) => {
    const { userId, username } = socket.handshake.query;
    if (userId && username) {
        onlineUsers.set(userId, { username, socketId: socket.id });
        io.emit("online-users", Array.from(onlineUsers.values()));
        console.log(`User connected: ${username} (ID: ${userId})`);
    }
    else {
        console.log("User connected without ID or username");
        return;
    }
    socket.on("join-room", ({ roomId }) => {
        if (roomId && userId && username) {
            socket.join(roomId);
            console.log(`${username} joined room: ${roomId} (ID: ${userId})`);
            io.to(roomId).emit("user-joined", `${username} has joined the room.`);
        }
        else {
            console.log("Room ID, User ID, or Username is missing");
        }
    });
    socket.on("typing", ({ roomId, senderName }) => {
        socket.to(roomId).emit("user-typing", { senderName });
    });
    socket.on("stop-typing", ({ roomId, senderName }) => {
        socket.to(roomId).emit("user-stopped-typing", { senderName });
    });
    socket.on("send-message", (_a) => __awaiter(void 0, [_a], void 0, function* ({ message, roomId, }) {
        try {
            if (message && userId && roomId) {
                yield axios_1.default.post(`${process.env.CLIENT_URL}/api/messages`, {
                    content: message,
                    senderId: userId,
                    senderName: username,
                    roomId,
                });
                const createdAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                io.to(roomId).emit("receive-message", {
                    senderId: userId,
                    senderName: username,
                    message,
                    createdAt,
                });
                console.log(`Message sent from ${username} to ${roomId}: ${message}`);
            }
            else {
                console.log("Message, User ID, or Receiver ID is missing");
            }
        }
        catch (err) {
            console.error("Error sending message:", err);
        }
    }));
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
