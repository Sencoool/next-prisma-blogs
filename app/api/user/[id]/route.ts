import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = Number(id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { email } = await request.json();
  const { id } = await params;
  const userId = Number(id);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
    },
  });

  return NextResponse.json(user);
}
