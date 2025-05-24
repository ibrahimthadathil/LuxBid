import React, { createContext, useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }:{ children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL)
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("error from use socket");
  }
  return context;
};