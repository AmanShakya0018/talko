"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ChatRoom() {
  const { roomId } = useParams();
  const socket = useSocket();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages?receiverId=${roomId}`);
        const data = res.data;
        setMessages(data.map((msg: { senderId: string; content: string }) => `${msg.senderId}: ${msg.content}`));
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching messages:", error.message);
        } else {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (socket && roomId) {
      socket.emit("join-room", { roomId });

      socket?.on("receive-message", ({ senderId, message }) => {
        setMessages((prev) => [...prev, `${senderId === session?.user.id ? "You" : "Friend"}: ${message}`]);
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, roomId, session?.user.id]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    socket?.emit("send-message", { message, receiverId: roomId });
    setMessage("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h1>
      <div className="border p-4 h-64 overflow-auto mb-4">
        {messages.map((msg, idx) => (
          <p key={idx} className="mb-2">{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
