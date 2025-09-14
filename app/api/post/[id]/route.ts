import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 }); // Error if params is a characters
    }

    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true, // Include author details
      },
    });

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 }); // Error if params id not found
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { title, content, description, published, authorId } =
    await request.json();
  const { id } = await params;
  const postId = Number(id);
  const Post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      description,
      published,
      authorId,
    },
  });

  return Response.json(Post);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = parseInt(id);
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return NextResponse.json({ message: `Delete post id ${postId} complete` });
}
