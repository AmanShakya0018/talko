"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import Image from "next/image";
import useReceiver from "@/hooks/useReceiver";
import useReceiverImage from "@/hooks/useReceiverImage";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Directory</h1>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
                className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
              >
                Chat
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {users
          .filter((user) => user.id !== session?.user?.id)
          .map((user) => (
            <li key={user.id} className="flex items-center gap-2 mb-2">
              <Image
                width={500}
                height={500}
                priority
                quality={99}
                src={user.image || "/pfp.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleChat(user.id, user.name, user.image)}
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
