"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./types/post";

export default function Home() {
  const [post, setPost] = useState<Post[]>([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get("/api/post");
      const data = res.data;
      console.log(data);

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
      <div className="text-2xl font-bold">Hello Next Prisma Blogs</div>
      <div className="font-bold">Content</div>
      <hr className="border-2 border-t border-gray-300 my-4 w-2/6" />
      <div className="flex flex-row">
        {post.map((item, index) => (
          <div className="m-2" key={index}>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
