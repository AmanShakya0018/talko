import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserDirectory from "@/components/userdirectory";
import { CustomScrollArea } from "@/components/ui/custom-scroll-area";
import Image from "next/image";

const EmptyStateUI = () => {
  return (
    <Sheet>
      <div className="flex items-center justify-center h-screen talko-pattern bg-neutral-950 text-white">
        <div className="text-center px-8 py-12 rounded-lg max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-800 p-6 rounded-full shadow-lg">
              <Image src={"/talko1.png"} alt={"pfp"} height={500} width={500} priority quality={99} className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6">Talko</h1>
          <p className="text-neutral-300 mb-4 text-lg">
            Connect and chat with friends anytime, anywhere.
          </p>
          <p className="text-neutral-400 mb-6">
            Welcome to your chat space – where conversations come to life.
          </p>
          <p className="text-neutral-500 text-sm">
            Your conversations are just a click away.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="w-16 h-1 bg-neutral-700 rounded-full"></div>
          </div>

          <SheetTrigger asChild>
            <button className="md:hidden mt-8 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg">
              Start Conversation
            </button>
          </SheetTrigger>
        </div>
      </div>
      <SheetContent className="bg-neutral-950 text-white border-neutral-900">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <CustomScrollArea className="h-full">
          <UserDirectory />
        </CustomScrollArea>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EmptyStateUI;
