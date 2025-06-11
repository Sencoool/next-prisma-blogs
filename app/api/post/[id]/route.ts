import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  const Post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return Response.json(Post);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  const Post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return Response.json({ message: `Delete post id ${postId} complete` });
}
