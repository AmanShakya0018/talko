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
        const response = await axios.get(`/api/messages?roomId=${roomId}`);
        const data = response.data;
        setMessages(data.map((msg: { senderName: string; content: string }) => `${msg.senderName}: ${msg.content}`));
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

      socket.on("receive-message", ({ senderName, message }) => {
        const displayName = senderName === session?.user.name ? "You" : senderName;
        setMessages((prev) => [...prev, `${displayName}: ${message}`]);
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, roomId, session?.user.name]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const senderName = session?.user.name || "Anonymous";
    socket?.emit("send-message", {
      message,
      senderName,
      roomId,
    });

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
