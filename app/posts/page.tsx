import { Post } from "../types/post";
import SearchBox from "@components/SearchBox";
import Link from "next/link";
import Pagination from "@components/Pagination";

interface BlogsResponse {
  data: Post[];
  totalPosts: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Function to fetch blogs from the API with optional search parameter
async function getBlogs(
  search?: string,
  limit: number = 6,
  page: number = 1
): Promise<BlogsResponse> {
  try {
    const url = new URL(
      `${process.env.API_URL}/api/post?&page=${page}&limit=${limit}`
    );
    if (search) {
      url.searchParams.set("search", search); // Add search param if it exists
    }

    url.searchParams.set("limit", limit.toString());
    url.searchParams.set("page", page.toString());

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs at posts : ", error);
    return { data: [], totalPosts: 0, page: 1, limit: 6, totalPages: 1 };
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
          src={`${post.coverImage}`}
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
          {post.description || "โพสต์นี้ยังไม่มีคำอธิบาย"}
        </p>
        <div className="card-actions justify-end">
          <Link
            href={`posts/${post.id}`}
            className="btn btn-outline btn-success btn-sm"
          >
            อ่าน
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
  searchParams: Promise<{ search?: string; page?: number; limit?: number }>;
}) {
  const { search, page, limit } = await searchParams;
  const blogs: BlogsResponse = await getBlogs(search, limit, page);

  return (
    <main className="min-h-screen bg-base-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-green-500">
              โพสต์ทั้งหมด 📚
            </h3>
            <SearchBox />
            <hr className="border-2 border-green-500 w-12" />
          </div>
          <BlogGrid posts={blogs.data} />
        </section>
        <Pagination
          limit={blogs.limit}
          page={blogs.page}
          totalPages={blogs.totalPages}
        />
      </div>
    </main>
  );
}
