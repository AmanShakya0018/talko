"use client";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";

export default function ChatWindow() {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const joinRoom = () => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", { roomId, message });
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 rounded"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={joinRoom} className="ml-2 bg-blue-500 text-white p-2 rounded">Join</button>

      <div className="mt-4">
        <input
          className="border p-2 rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="mt-2 bg-green-500 text-white p-2 rounded w-full">Send</button>
      </div>

      <div className="mt-4 border p-4">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
