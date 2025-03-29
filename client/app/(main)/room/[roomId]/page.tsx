"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import axios from "axios";
import useReceiver from "@/hooks/useReceiver";
import Image from "next/image";
import useReceiverImage from "@/hooks/useReceiverImage";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatRoom() {
  const { roomId } = useParams();
  const socket = useSocket();
  const { data: session } = useSession();
  const { receiver } = useReceiver();
  const { receiverImage } = useReceiverImage();
  const [hasMounted, setHasMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState<{ senderName: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages?roomId=${roomId}`);
        const data = response.data;
        setMessages(data.map((msg: { senderName: string; content: string }) => ({
          senderName: msg.senderName,
          content: msg.content,
        })));
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
        setMessages((prev) => [...prev, { senderName: displayName, content: message }]);
      });

      socket.on("online-users", (users) => {
        const isOnline = users.some((user: { username: string; }) => user.username === receiver);
        setIsOnline(isOnline);
      });

      return () => {
        socket.off("receive-message");
        socket.off("online-users");
      };
    }
  }, [socket, roomId, session?.user.name, receiver]);

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


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="w-full h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin" /></div >;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="p-4 border-b bg-white dark:bg-neutral-800 shadow-sm">
        <div className="max-w-screen mx-auto flex items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              fill
              priority
              quality={90}
              src={receiverImage || "/pfp.png"}
              alt="Profile picture"
              className="object-cover"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-semibold">{receiver}</h2>
            <div className={`flex items-center text-sm ${isOnline ? "text-green-500 " : "text-neutral-400"}`}>
              <span
                className={`h-2 w-2 rounded-full mr-2 ${isOnline ? "bg-green-500" : "bg-neutral-400"
                  }`}
              ></span>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-2">
          {messages.map((msg, idx) => {
            const isSender = msg.senderName === session?.user.name;
            return (
              <div
                key={idx}
                className={`flex ${isSender ? "justify-end" : "justify-start"} w-full px-4`}
              >
                <div
                  className={`inline-block py-2 px-4 rounded-lg text-sm max-w-[90%] sm:max-w-[85%] md:max-w-[75%] break-words ${isSender ? "bg-green-500 text-white" : "bg-primary/10 text-black dark:text-white"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t bg-white dark:bg-neutral-800">
        <div className="max-w-screen mx-auto flex gap-2 items-center">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} className="px-4">
            <Send size={18} className="mr-2" /> Send
          </Button>
        </div>
      </div>
    </div>
  );
}
