import Link from "next/link";
import { generateHTML } from "@tiptap/html/server"; // need to use this extension to convert TIPTAP JSON Format into HTML
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

async function getBlogs(id: number) {
  try {
    const baseUrl = process.env.API_URL || "http://localhost:3000";
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
  const postId = parseInt(id);
  const post = await getBlogs(postId);

  // Add every Extensions that use when create blogs
  const extensions = [StarterKit, Image];

  let postContentHTML = "";

  // Checking if post is String or JSON
  if (post && post.content) {
    try {
      const contentData =
        typeof post.content === "string"
          ? JSON.parse(post.content) // If string parse JSON first
          : post.content;

      // Parse Tiptap JSON content Into HTML string
      postContentHTML = generateHTML(contentData, extensions);
    } catch (e) {
      console.error("Error parsing or generating HTML from Tiptap JSON:", e);
      postContentHTML = "<p>Error loading content.</p>";
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      {post ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <hr className="border-2 border-t my-4" />
          <div className="max-w-2xl mx-auto p-4 mt-5 shadow-md rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: postContentHTML }} />
          </div>
        </div>
      ) : (
        <div className="text-lg">Post is not available</div>
      )}
    </div>
  );
}
