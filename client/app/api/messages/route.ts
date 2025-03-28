import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, senderId, receiverId } = body;

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
    });

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("Error storing message:", (error as Error).message);
    return NextResponse.json({ message: "Error storing message" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const receiverId = searchParams.get("receiverId");

  try {
    const messages = await prisma.message.findMany({
      where: { receiverId: receiverId || "" },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error retrieving messages:", (error as Error).message);
    return NextResponse.json({ message: "Error retrieving messages" }, { status: 500 });
  }
}
