"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import axios from "axios";
import useReceiver from "@/hooks/useReceiver";
import Image from "next/image";
import useReceiverImage from "@/hooks/useReceiverImage";
import { Loader2 } from "lucide-react";

export default function ChatRoom() {
  const { roomId } = useParams();
  const socket = useSocket();
  const { data: session } = useSession();
  const { receiver } = useReceiver();
  const { receiverImage } = useReceiverImage();
  const [hasMounted, setHasMounted] = useState(false);
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
        const displayName = senderName === session?.user.name ? session?.user.name || "You" : senderName;
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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="w-full h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin" /></div >;
  }

  return (
    <div className="p-4">
      <div className="text-2xl flex items-center gap-2 font-bold mb-4">
        <Image
          width={500}
          height={500}
          priority
          quality={99}
          src={receiverImage || "/pfp.png"}
          alt={"pfp"}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        /> {receiver ? receiver : "Friend"}</div>
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
