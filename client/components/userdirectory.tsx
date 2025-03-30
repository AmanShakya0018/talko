"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import Image from "next/image";
import useReceiver from "@/hooks/useReceiver";
import useReceiverImage from "@/hooks/useReceiverImage";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import SignInButton from "./SignInButoon";

interface User {
  id: string;
  name: string;
  image: string;
}

export default function UserDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();
  const { setReceiver } = useReceiver();
  const { setReceiverImage } = useReceiverImage();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleChat = (selectedUserId: string, selectedUserName: string, selectedUserImage: string) => {
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;
    const roomId = [currentUserId, selectedUserId].sort().join("-");
    setReceiver(selectedUserName);
    setReceiverImage(selectedUserImage);
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="mt-4 ml-2">
      <div className="flex flex-row items-center mb-4 justify-between">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold ml-4">Chats</h1>
        </Link>
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <SignInButton text={"Sign In"} />
        )}
      </div>
      <div className="space-y-1">
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <button
              onClick={() => handleChat(user.id, user.name, user.image)}
              key={user.id}
              className="flex items-center w-full pl-2 py-3 rounded-md hover:bg-neutral-800 transition-colors"
            >
              <div className="relative mr-3">
                <Image
                  width={500}
                  height={500}
                  priority
                  quality={99}
                  src={user.image || "/pfp.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div className="flex-1 text-start">
                <div className="flex justify-between">
                  <h2 className="text-[1.1rem] font-medium truncate">{user.name}</h2>

                </div>
                <p className="text-xs text-gray-400 truncate">Start a conversation</p>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
