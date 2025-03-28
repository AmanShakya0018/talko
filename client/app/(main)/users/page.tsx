"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import Image from "next/image";

interface User {
  id: string;
  name: string;
  image: string;
}

export default function UserDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();
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


  const handleChat = (selectedUserId: string) => {
    const currentUserId = session?.user?.id;
    if (!currentUserId) return;
    const roomId = [currentUserId, selectedUserId].sort().join("-");
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Directory</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-2 mb-2">
            <Image
              width={500}
              height={500}
              priority
              quality={95}
              src={user.image || "/pfp.png"}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <span>{user.name}</span>
            <button
              onClick={() => handleChat(user.id)}
              className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
