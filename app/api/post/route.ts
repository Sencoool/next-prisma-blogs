import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all post method
export async function GET() {
  const data = await prisma.post.findMany();
  return Response.json(data);
}

// Create new post method

export async function POST(request: Request) {
  const { title, content, published, authorId } = await request.json();
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
  });
  return Response.json(newPost);
}
