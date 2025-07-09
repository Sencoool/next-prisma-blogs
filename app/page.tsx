import Link from "next/link";
import { Post } from "./types/post";

async function getBlogs() {
  try {
    const baseUrl = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/post`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return []; // return empty array prevent .map error
  }
}

export default async function homePage() {
  const post = await getBlogs();

  return (
    <main className="flex flex-col justify-center items-center mt-5">
      <div className="text-2xl font-bold">Jira Blogs</div>
      <div className="font-bold">Content</div>
      <hr className="border-2 border-t my-4 w-2/6" />
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full px-4">
        {post.length > 0 ? (
          post.map((item: Post, index: number) => (
            <div
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              key={index}
            >
              <div className="font-semibold text-lg">{item.title}</div>
              <div className="flex">
                <Link
                  href={`posts/${item.id}`}
                  className="ml-auto btn btn-outline btn-success"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </main>
  );
}
