import Link from "next/link";

async function getBlogs(id: number) {
  try {
    const baseUrl = process.env.API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/post/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();

    return data.data; // access data object
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return null; // return null prevent .map error
  }
}

export default async function postPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = await getBlogs(postId);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <Link href={"/"}>Home</Link>
      {post ? <div>{post.title}</div> : <div>Post is not available</div>}
    </div>
  );
}
