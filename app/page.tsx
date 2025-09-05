import Link from "next/link";
import { Post, RecommendedPost } from "./types/post";

async function getRecentPost() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/post/recentpost`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return [];
  }
}

async function getRecommendedPosts() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/post/randompost`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return [];
  }
}

// Header Section
function BlogHeader() {
  return (
    <div className="flex flex-col items-center mb-10">
      <h1 className="text-4xl font-extrabold text-green-600 mb-2 tracking-tight">
        Jira Blogs
      </h1>
      <p className="text-gray-500 text-lg">
        All your latest tech stories in one place
      </p>
      <hr className="border-2 border-green-500 w-16 mt-4" />
    </div>
  );
}

// Highlight Recent Post
function RecentPost({ post }: { post: Post }) {
  return (
    <section className="mb-12">
      <p className="mb-2 font-bold text-2xl text-green-500">Recent Post 🔥</p>
      <div className="card lg:card-side bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-200 overflow-hidden">
        <figure className="lg:w-2/5 w-full h-64 lg:h-auto">
          <img
            src={`/uploads/${post.coverImage}`}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body lg:w-3/5">
          <h2 className="card-title text-2xl font-bold text-green-700">
            {post.title}
          </h2>
          <p className="text-gray-500 mb-2">📝 {post.author.name}</p>
          <p className="text-base text-gray-700 line-clamp-3 mb-4">
            {post.description || "This post has no description yet."}
          </p>
          <div className="card-actions justify-end">
            <Link href={`posts/${post.id}`} className="btn btn-success btn-sm">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Blog Card
function BlogCard({ post }: { post: RecommendedPost }) {
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
        <p className="text-gray-500 text-sm mb-2">📝 {post.name}</p>
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

// Blog Grid Section
function BlogGrid({ posts }: { posts: RecommendedPost[] }) {
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

export default async function homePage() {
  const post: Post = await getRecentPost();
  const recommendedPosts: RecommendedPost[] = await getRecommendedPosts();

  return (
    <main className="min-h-screen bg-base-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <BlogHeader />
        {post && <RecentPost post={post} />}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-green-500">
              Recommended Posts for you 📔
            </h3>
            <hr className="border-2 border-green-500 w-12" />
          </div>
          <BlogGrid posts={recommendedPosts} />
        </section>
      </div>
    </main>
  );
}
