import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Chat App!</h1>
        <Link href="/users" className="text-blue-500 underline">
          View All Users
        </Link>
      </div>
    </>
  );
}
