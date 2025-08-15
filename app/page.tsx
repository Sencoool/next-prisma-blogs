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
    return []; // return empty array to prevent .map error
  }
}

export default async function homePage() {
  const post = await getBlogs();

  return (
    <main className="flex flex-col items-center mt-5 transition-all duration-300">
      <div className="text-2xl font-bold">Jira Blogs</div>
      <hr className="border-2 border-t my-4 w-2/6" />
      <div className="mb-4 w-full max-w-5xl px-4">
        <p className="text-xl font-semibold">Recent post</p>
        <hr className="border-2 w-2/6 md:w-2/12 mt-2" />
      </div>
      {/* โพสต์ล่าสุด - แสดงเต็มหน้าจอ */}
      {post.length > 0 && (
        <div className="w-full max-w-5xl px-4 mb-8">
          <div className="flex flex-col border rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-bold mb-2">{post[0].title}</h2>
            <p className="text-gray-500 mb-4">📝 : {post[0].author.name}</p>
            <div className="md:h-80 w-full m-auto mb-4 border rounded-lg overflow-hidden">
              <img
                src={`/uploads/${post[0].coverImage}`}
                className="object-cover h-full w-full"
                alt=""
              />
            </div>
            <div className="flex">
              <Link
                href={`posts/${post[0].id}`}
                className="ml-auto btn btn-outline btn-success"
              >
                Read
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* other post Future: make it a component*/}
      <div className="mb-4 w-full max-w-5xl px-4">
        <p className="text-xl font-semibold">All post</p>
        <hr className="border-2 w-2/6 md:w-2/12 mt-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full px-4">
        {post.length > 1
          ? post.slice(1).map(
              (
                posts: Post,
                index: number // .slice(1) to skip the first post
              ) => (
                <div
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  key={index}
                >
                  <div className="font-semibold text-lg">
                    <p>{posts.title}</p>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    <p>📝 : {posts.author.name}</p>
                  </div>
                  <div className="mb-2 border rounded-lg overflow-hidden">
                    <img src={`/uploads/${posts.coverImage}`} alt="" />
                  </div>
                  <div className="flex mt-2">
                    <Link
                      href={`posts/${posts.id}`}
                      className="ml-auto btn btn-outline btn-success"
                    >
                      View
                    </Link>
                  </div>
                </div>
              )
            )
          : post.length === 0 && <div>No posts available</div>}
      </div>
    </main>
  );
}
