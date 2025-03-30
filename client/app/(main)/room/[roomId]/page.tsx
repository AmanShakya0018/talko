"use client"
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useSocket } from "@/hooks/useSocket"
import { useSession } from "next-auth/react"
import axios from "axios"
import useReceiver from "@/hooks/useReceiver"
import Image from "next/image"
import useReceiverImage from "@/hooks/useReceiverImage"
import { Loader2, MoreVertical, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomScrollArea } from "@/components/ui/custom-scroll-area"
import { CustomInput } from "@/components/ui/custom-input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import UserDirectory from "@/components/userdirectory"
import Link from "next/link"

export default function ChatRoom() {
  const { roomId } = useParams()
  const socket = useSocket()
  const { toast } = useToast()
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
      toast({
        description: "Chat cleared succesfully",
      })
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
    <Sheet>
      <div className="flex flex-col h-screen w-full bg-neutral-950">
        {/* Header */}
        <div className="p-4 border-b border-neutral-900 flex items-center justify-between bg-neutral-950 shadow-sm">
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
              <h2 className="text-xl text-white font-semibold">{receiver}</h2>
              <div className={`flex items-center text-xs ${isOnline ? "text-green-500 " : "text-neutral-400"}`}>
                <span className={`h-1.5 w-1.5 rounded-full mr-1 ${isOnline ? "bg-green-500" : "bg-neutral-400"}`}></span>
                {isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-neutral-900">
                  <MoreVertical className="h-5 w-5 text-zinc-200" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <Link href={"/"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Home
                  </DropdownMenuItem>
                </Link>
                <SheetTrigger className="w-full md:hidden block text-start">
                  <DropdownMenuItem className="cursor-pointer">
                    All Users
                  </DropdownMenuItem>
                </SheetTrigger>
                <Link href={"/room"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Chats
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={clearChat} className="text-red-500 focus:text-red-500 cursor-pointer">
                  Clear Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <CustomScrollArea className="flex-1 talko-pattern bg-neutral-900">
          <div className="space-y-4 py-2">
            {messages.map((msg, idx) => {
              const isSender = msg.senderName === session?.user.name
              return (
                <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"} w-full px-4`}>
                  <div
                    className={`inline-block relative py-2 px-4 rounded-xl text-sm min-w-20 max-w-[90%] sm:max-w-[85%] md:max-w-[75%] break-words ${isSender ? "bg-green-500 text-white rounded-tr-none" : "bg-neutral-700/90 text-white rounded-tl-none"
                      }`}
                  ><p className="mb-0.5 mr-6">
                      {msg.content}
                    </p>
                    <span className={`text-[0.58rem] ${isSender ? "opacity-90" : "opacity-70"}  ml-2 absolute bottom-0 right-2`}>{msg.createdAt}</span>
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
        <div className="p-4 border-t border-neutral-900 bg-neutral-950">
          <div className="flex items-center gap-2">
            <CustomInput
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                handleTyping()
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 border-neutral-900 rounded-full"
            />
            <Button onClick={sendMessage} size="icon" className="rounded-full bg-white">
              <Send className="h-5 w-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
      <SheetContent className='bg-neutral-950 text-white border-neutral-900 px-2 pr-4'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <CustomScrollArea className='h-full'>
          <UserDirectory />
        </CustomScrollArea>
        <SheetFooter>
          <SheetClose asChild>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}