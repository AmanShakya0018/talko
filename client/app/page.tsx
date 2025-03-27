"use client"
import ChatWindow from "@/components/chatwindow";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <div className="text-4xl">
        <div>hi {session?.user.name}</div>
      </div>
      <ChatWindow />
    </>
  );
}
