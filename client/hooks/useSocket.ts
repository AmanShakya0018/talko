import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

export const useSocket = () => {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let newSocket: Socket;

    if (session?.user) {
      newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
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

      const tryConnect = () => {
        if (!newSocket.connected) {
          console.log("Attempting to connect to socket...");
          newSocket.connect();
        }
      };

      tryConnect();

      const interval = setInterval(() => {
        if (!newSocket.connected) {
          tryConnect();
        } else {
          clearInterval(interval);
        }
      }, 1000);

      newSocket.on("connect", () => {
        console.log(`Connected to socket server: ${newSocket.id}`);
      });

      newSocket.on("disconnect", () => {
        console.log(`⚠️ Disconnected from socket server`);
      });

      setSocket(newSocket);

      return () => {
        clearInterval(interval);
        newSocket.disconnect();
      };
    }
  }, [session?.user]);

  return socket;
};
