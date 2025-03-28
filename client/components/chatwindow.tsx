"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

export default function ChatWindow() {
  const { data: session } = useSession();
  const router = useRouter();
  const socket = useSocket();
  const [roomId, setRoomId] = useState("");
  const [mounted, setMounted] = useState(false);

  const joinRoom = () => {
    if (socket && roomId) {
      socket.emit("join-room", { roomId, userName: session?.user?.name });
      router.push(`/room/${roomId}`);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

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
    </div>
  );
}
