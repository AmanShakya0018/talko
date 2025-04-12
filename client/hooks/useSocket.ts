import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

export const useSocket = () => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
      query: {
        userId: session.user.id,
        username: session.user.name,
      },
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ["websocket"],
    });

    const pingSocketUntilConnected = (attempt = 1) => {
      if (newSocket.connected) {
        console.log("Socket connected:", newSocket.id);
        return;
      }

      console.log(`Socket connect attempt ${attempt}...`);
      newSocket.connect();

      setTimeout(() => {
        if (!newSocket.connected) {
          pingSocketUntilConnected(attempt + 1);
        }
      }, 1000);
    };

    pingSocketUntilConnected();

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.warn("Disconnected from socket server");
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [session?.user]);

  return socket;
};
