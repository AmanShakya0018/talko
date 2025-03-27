"use client";
import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function ChatWindow() {
  const socket = useSocket();
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const joinRoom = () => {
    if (socket && roomId) {
      socket.emit("join-room", roomId);
      console.log(`Joined room: ${roomId}`);
    }
  };

  const sendMessage = () => {
    if (socket && roomId && message) {
      socket.emit("send-message", { roomId, message });
      setMessage("");
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Chat App</h1>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={joinRoom} className="ml-2 bg-blue-500 text-white p-2 rounded">
          Join Room
        </button>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={sendMessage} className="ml-2 bg-green-500 text-white p-2 rounded">
          Send
        </button>
      </div>

      <div className="mt-6 w-full max-w-md border p-4 rounded">
        <h2 className="text-lg font-bold">Messages:</h2>
        {messages.map((msg, index) => (
          <p key={index} className="p-2 border-b">
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}
