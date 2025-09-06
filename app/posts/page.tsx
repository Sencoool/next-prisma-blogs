import { Post } from "../types/post";
import SearchBox from "@components/SearchBox";
import Link from "next/link";

// Function to fetch blogs from the API with optional search parameter
async function getBlogs(search?: string): Promise<Post[]> {
  try {
    const url = new URL(`${process.env.API_URL}/api/post?search=${search}`);
    if (search) {
      url.searchParams.set("search", search); // Add search param if it exists
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return [];
  }
}

// Blog grid component
function BlogGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No posts available</div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// Individual blog card component
function BlogCard({ post }: { post: Post }) {
  return (
    <div className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-200">
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={`/uploads/${post.coverImage}`}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h4 className="card-title text-lg font-bold text-green-600">
          {post.title}
        </h4>
        <p className="text-gray-500 text-sm mb-2">📝 {post.author.name}</p>
        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {post.description || "This post has no description yet."}
        </p>
        <div className="card-actions justify-end">
          <Link
            href={`posts/${post.id}`}
            className="btn btn-outline btn-success btn-sm"
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main blogs page component
export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const search = (await searchParams).search || "";
  const blogs: Post[] = await getBlogs(search);

  return (
    <main className="min-h-screen bg-base-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-green-500">All posts 📚</h3>
            <SearchBox />
            <hr className="border-2 border-green-500 w-12" />
          </div>
          <BlogGrid posts={blogs} />
        </section>
      </div>
    </main>
  );
}
