"use client"
import { createContext, useState } from "react";
type ReceiverImageContextType = {
  receiverImage: string;
  setReceiverImage: (receiverImage: string) => void;
};
export const ReceiverImageContext = createContext<ReceiverImageContextType | undefined>(undefined);
export default function ReceiveImagerProvider({ children }: { children: React.ReactNode }) {
  const [receiverImage, setReceiverImage] = useState('');
  return <ReceiverImageContext.Provider value={{ receiverImage, setReceiverImage }}>{children}</ReceiverImageContext.Provider>;
}