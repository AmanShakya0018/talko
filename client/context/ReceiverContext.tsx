"use client"
import { createContext, useState } from "react";
type ReceiverContextType = {
  receiver: string;
  setReceiver: (receiver: string) => void;
};
export const ReceiverContext = createContext<ReceiverContextType | undefined>(undefined);
export default function ReceiverProvider({ children }: { children: React.ReactNode }) {
  const [receiver, setReceiver] = useState('');
  return <ReceiverContext.Provider value={{ receiver, setReceiver }}>{children}</ReceiverContext.Provider>;
}