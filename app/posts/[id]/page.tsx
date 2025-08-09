import { generateHTML } from "@tiptap/html/server"; // need to use this extension to convert TIPTAP JSON Format into HTML
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import type { Metadata } from "next";
const baseUrl = process.env.API_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read params id
  const { id } = await params;
  const blogs = await getBlogs(parseInt(id));

  return {
    title: blogs.title,
  };
}

async function getBlogs(id: number) {
  try {
    const response = await fetch(`${baseUrl}/api/post/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogs(parseInt(id));

  // Add every Extensions that use with RTE
  const extensions = [StarterKit, Image];

  let postContentHTML = "";

  // Checking if post is String or JSON
  if (post && post.content) {
    try {
      postContentHTML = generateHTML(post.content, extensions);
    } catch (e) {
      console.error("Error parsing or generating HTML from Tiptap JSON:", e);
      postContentHTML = "<p>Error loading content.</p>";
    }
  }

  // Format the post date

  const postDate = new Date(post.updatedAt);

  const day = postDate.getDate();
  const month = postDate.toLocaleString("default", { month: "long" });
  const year = postDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div className="container mx-auto my-8 shadow-xl rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        {/* TOC */}
        <div className="hidden md:block md:w-1/4 p-6 border-r border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#" className="hover:text-blue-800">
              Heading
            </a>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 w-full p-6">
          <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
          <p className="text-gray-500">Created by {post?.author?.name}</p>
          <p className="text-gray-500 mb-6">Published on {formattedDate}</p>
          <hr className="my-6 border-gray-200" />
          <div className="prose lg:prose-xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: postContentHTML }} />
          </div>
        </div>
      </div>
    </div>
  );
}
