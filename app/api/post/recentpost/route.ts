import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const post = await prisma.post.findFirst({
      include: { author: true },
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recent post" },
      { status: 500 }
    );
  }
}
