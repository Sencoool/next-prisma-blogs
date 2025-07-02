"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./types/post";
import Link from "next/link";

export default function Home() {
  const [post, setPost] = useState<Post[]>([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get("/api/post");
      const data = res.data;

      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center mt-5">
      <div className="text-2xl font-bold">Jira Blogs</div>
      <div className="font-bold">Content</div>
      <hr className="border-2 border-t my-4 w-2/6" />
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full px-4">
        {post.map((item, index) => (
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
        ))}
      </div>
    </main>
  );
}
