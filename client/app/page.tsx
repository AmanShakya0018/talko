"use client"
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  return (
    <div className="text-4xl">

      <div>hi {session?.user.name}</div>
    </div>
  );
}
