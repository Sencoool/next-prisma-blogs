import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all post method
export async function GET() {
  const data = await prisma.user.findMany();
  return Response.json(data);
}

// Create new post method

export async function POST(request: Request) {
  const { email, name } = await request.json();
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  return Response.json(newUser);
}
