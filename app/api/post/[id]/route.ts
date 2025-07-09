import { PrismaClient } from "@prisma/client";
import { error } from "console";
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

    const Post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!Post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 }); // Error if params id not found
    }

    return NextResponse.json({ Post }, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
  }
}

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { title, content, published, authorId } = await request.json();
//   const { id } = await params;
//   const postId = Number(id);
//   const Post = await prisma.post.update({
//     where: {
//       id: postId,
//     },
//     data: {
//       title,
//       content,
//       published,
//       authorId,
//     },
//   });

//   return Response.json(Post);
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params;
//   const postId = Number(id);
//   const Post = await prisma.post.delete({
//     where: {
//       id: postId,
//     },
//   });
//   return Response.json({ message: `Delete post id ${postId} complete` });
// }
