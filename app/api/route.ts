import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  return Response.json({
    message: "Hello Postman",
  });
}
