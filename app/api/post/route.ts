import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const prisma = new PrismaClient();

// Get all post method
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");

  const page = parseInt(searchParams.get("page") || "1"); // current page
  const limit = parseInt(searchParams.get("limit") || "1"); // limit items shown per page
  const skip = (page - 1) * limit; // items to skip ex. page 1 skip 0, page 2 skip 6

  // Build the where clause based on search parameter
  const where: any = {};
  if (search) {
    where.published = true;
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const data = await prisma.post.findMany({
    where: where,
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: limit,
  });

  // Get total count of posts for pagination
  const totalPosts = await prisma.post.count({
    where: where,
  });

  return NextResponse.json({
    data,
    totalPosts,
    page,
    limit,
    totalPages: Math.ceil(totalPosts / limit) || 1, // Ensure at least 1 page
  });
}

// Create new post method
export async function POST(request: Request) {
  const data = await request.formData(); // Use formData to handle file uploads

  const title = data.get("title") as string;
  const postData = data.get("content") as string;
  const published = data.get("published") === "true" ? true : false; // Convert string to boolean
  const coverImage = data.get("coverImage") as File;

  const content = JSON.parse(postData); // Convert string to JSON

  const file = coverImage;
  // console.log("File received: ", file);

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
