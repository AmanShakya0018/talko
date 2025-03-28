"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter, useParams } from "next/navigation";

export default function RoomPage() {
  const { data: session, status } = useSession();
  const socket = useSocket();
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (socket) {
      console.log(`Joining room: ${roomId}`);
      socket.emit("join-room", { roomId, userName: session?.user?.name });

      socket.on("receive-message", (msg) => {
        console.log("Message received:", msg);
        setMessages((prev) => [...prev, msg]);
      });

      socket.once("user-joined", (userName) => {
        console.log("User joined:", userName);
        setMessages((prev) => [...prev, `${userName} joined the room.`]);
      });

      return () => {
        console.log("Cleaning up listeners");
        socket.off("receive-message");
        socket.off("user-joined");
      };
    }
  }, [socket, roomId, session?.user?.name]);


  const sendMessage = () => {
    if (socket && message) {
      socket.emit("send-message", { roomId, message, userName: session?.user?.name });
      setMessage("");
    }
  };


  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Room: {roomId}</h1>
      <div className="mt-4 w-full max-w-md border p-4 rounded">
        <h2 className="text-lg font-bold">Messages:</h2>
        {messages.map((msg, index) => (
          <p key={index} className="p-2 border-b">{msg}</p>
        ))}
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
    </div>
  );
}
