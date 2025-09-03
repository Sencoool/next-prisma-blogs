import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ORDER BY RANDOM() LIMIT 3
    const posts = await prisma.$queryRaw`SELECT         
        p.id AS "id",
        p.title,
        p.description,
        p."coverImage",
        u.name AS "name"
 FROM "Post" AS p LEFT JOIN "User" AS u ON u.id = p."authorId"
      WHERE p."published" = true ORDER BY RANDOM() LIMIT 3`;
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch random post" },
      { status: 500 }
    );
  }
}
