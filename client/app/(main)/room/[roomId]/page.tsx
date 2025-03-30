"use client"
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useSocket } from "@/hooks/useSocket"
import { useSession } from "next-auth/react"
import axios from "axios"
import useReceiver from "@/hooks/useReceiver"
import Image from "next/image"
import useReceiverImage from "@/hooks/useReceiverImage"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomScrollArea } from "@/components/ui/custom-scroll-area"
import { Themetoggle } from "@/components/ThemeToggle"

export default function ChatRoom() {
  const { roomId } = useParams()
  const socket = useSocket()
  const { data: session } = useSession()
  const { receiver } = useReceiver()
  const { receiverImage } = useReceiverImage()
  const [hasMounted, setHasMounted] = useState(false)
  const [message, setMessage] = useState("")
  const [isOnline, setIsOnline] = useState(false)
  const [messages, setMessages] = useState<{ senderName: string; content: string; createdAt: string }[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<string | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages?roomId=${roomId}`)
        const data = response.data
        setMessages(
          data.map((msg: { senderName: string; content: string, createdAt: Date }) => ({
            senderName: msg.senderName,
            content: msg.content,
            createdAt: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          })),
        )
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching messages:", error.message)
        } else {
          console.error("Error fetching messages:", error)
        }
      }
    }

    fetchMessages()
  }, [roomId])

  useEffect(() => {
    if (socket && roomId) {
      socket.emit("join-room", { roomId })

      socket.on("receive-message", ({ senderName, message, createdAt }) => {
        const displayName = senderName === session?.user.name ? session?.user.name || "You" : senderName
        setMessages((prev) => [...prev, { senderName: displayName, content: message, createdAt }])
      })

      socket.on("user-typing", ({ senderName }) => {
        setTypingUser(senderName)
        setIsTyping(true)
      })

      socket.on("user-stopped-typing", () => {
        setTypingUser(null)
        setIsTyping(false)
      })

      socket.on("online-users", (users) => {
        const isOnline = users.some((user: { username: string }) => user.username === receiver)
        setIsOnline(isOnline)
      })

      socket.on("chat-cleared", () => {
        setMessages([]);
      });

      return () => {
        socket.off("receive-message")
        socket.off("online-users")
        socket.off("user-typing")
        socket.off("user-stopped-typing")
        socket.off("chat-cleared");
      }
    }
  }, [socket, roomId, session?.user.name, receiver])

  const handleTyping = () => {
    socket?.emit("typing", {
      roomId,
      senderName: session?.user?.name,
    })

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit("stop-typing", {
        roomId,
        senderName: session?.user?.name,
      })
    }, 1000)
  }

  const clearChat = async () => {
    try {
      await axios.delete(`/api/messages`, { data: { roomId } });
      socket?.emit("clear-chat", { roomId });
      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };


  const sendMessage = async () => {
    if (!message.trim()) return
    const senderName = session?.user.name || "Anonymous"
    socket?.emit("send-message", {
      message,
      senderName,
      roomId,
    })

    setMessage("")
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-neutral-800 shadow-sm">
        <div className="flex items-center">
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
              <span className={`h-2 w-2 rounded-full mr-2 ${isOnline ? "bg-green-500" : "bg-neutral-400"}`}></span>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>
        <div>
          <Themetoggle />
          <Button
            onClick={clearChat}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Messages */}
      <CustomScrollArea className="flex-1">
        <div className="space-y-4 py-2">
          {messages.map((msg, idx) => {
            const isSender = msg.senderName === session?.user.name
            return (
              <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"} w-full px-4`}>
                <div
                  className={`inline-block relative py-2 px-4 rounded-xl text-sm min-w-20 max-w-[90%] sm:max-w-[85%] md:max-w-[75%] break-words ${isSender ? "bg-green-500 text-white rounded-tr-none" : "bg-primary/10 text-black dark:text-white rounded-tl-none"
                    }`}
                ><p className="mb-0.5 mr-6">
                    {msg.content}
                  </p>
                  <span className="text-[0.6rem] opacity-70 ml-2 absolute bottom-0 right-2">{msg.createdAt}</span>
                </div>
              </div>
            )
          })}
          {isTyping && typingUser && (
            <div className="flex justify-start w-full px-4">
              <div className="flex items-center h-8 py-2 px-4 rounded-xl rounded-tl-none text-sm max-w-[90%] sm:max-w-[85%] md:max-w-[75%] break-words bg-primary/10 text-black dark:text-white">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CustomScrollArea>

      {/* Input area */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              handleTyping()
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-full"
          />
          <Button onClick={sendMessage} size="icon" className="rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}