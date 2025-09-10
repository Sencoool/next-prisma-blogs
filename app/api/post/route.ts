import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

// Get all post method
export async function GET(request: NextRequest) {
  try {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Create new post method
export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const title = data.get("title") as string;
    const postData = data.get("content") as string;
    const published = data.get("published") === "true"; // Convert string to boolean
    const coverImage = data.get("coverImage") as File;

    const content = JSON.parse(postData);

    if (!coverImage) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    // file upload to Vercel Blob
    const blob = await put(`coverimage/${coverImage.name}`, coverImage, {
      access: "public",
    });

    // blob.url is URL of the uploaded image
    const imageUrl = blob.url;

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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
