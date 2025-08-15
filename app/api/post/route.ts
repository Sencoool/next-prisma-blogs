import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const prisma = new PrismaClient();

// Get all post method
export async function GET() {
  // Future: Add limit to this endpoint for pagination
  // Future: Add sorting to this endpoint
  // Future: Add filtering to this endpoint
  // Future: Add searching to this endpoint
  const data = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return NextResponse.json(data);
}

// Create new post method

export async function POST(request: Request) {
  // const { content } = await request.json();

  const data = await request.formData();
  const title = data.get("title") as string;
  const postData = data.get("content") as string;
  const published = data.get("published") === "true" ? true : false; // Convert string to boolean
  const coverImage = data.get("coverImage") as File;

  const content = JSON.parse(postData); // Convert string to JSON

  const file = coverImage;
  console.log("File received: ", file);

  if (!file) {
    return Response.json({ error: "Cover image is required" }, { status: 400 });
  }

  // Convert the file to a buffer and save it to the public/uploads directory
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const oldFileName = path.extname(file.name);
  const timestamp = Date.now();
  const newFileName = `${timestamp}${oldFileName}`; // Create a unique filename

  const filePath = path.join(process.cwd(), "public", "uploads", newFileName);
  await writeFile(filePath, buffer); // Save the file to the uploads directory

  const imageUrl = `${newFileName}`;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId: 3,
      coverImage: imageUrl,
    },
  });
  return NextResponse.json(newPost);
}
