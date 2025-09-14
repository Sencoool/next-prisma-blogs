import { generateHTML } from "@tiptap/html/server";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import type { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import TableOfContents from "@/app/components/TableOfContent";
import Link from "next/link";

// --- Fetch Data ---
async function fetchPost(id: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/post/${id}`);
    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return null;
  }
}

// --- Extract Headings data from HTML ---
function extractHeadings(html: string) {
  const regex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi; // Use regex to find all <h1> to <h6> tags in the HTML.
  const headings = []; // store heading elements
  let match;
  while ((match = regex.exec(html)) !== null) {
    // console.log(match[1]);
    const level = parseInt(match[1]); // get heading level ex. 1, 2
    const text = match[2].replace(/<[^>]*>/g, ""); // get inner text ex. What is regex?
    const id = text // generate string to assign in id attribute ex. my-heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ level, text, id }); // store all heading elements
  }
  return headings;
}

function addHeadingIds(
  html: string,
  headings: { level: number; text: string; id: string }[]
) {
  let result = html;
  headings.forEach(({ level, text, id }) => {
    const original = `<h${level}[^>]*>${text.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )}</h${level}>`; // Replace the original tag with a new tag containing id and class attributes.
    const replaced = `<h${level} id="${id}" class="scroll-mt-20">${text}</h${level}>`; //  Adds id and scroll-mt-20 class to each heading tag in the HTML string.
    result = result.replace(new RegExp(original, "i"), replaced); // Replace the original heading with the new heading.
  });
  return result;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
}

function getReadingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / 200);
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPost(parseInt(id));
  return { title: post?.title || "Post" };
}

// --- Main Page ---
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPost(parseInt(id));
  if (!post) return <div>Post not found.</div>;

  const extensions = [StarterKit, Image];
  let html = "";
  try {
    html = generateHTML(post.content, extensions);
  } catch {
    html = "<p>Error loading content.</p>";
  }

  // ประมวลผล headings และ html ที่เพิ่ม id/class ในฝั่ง server
  const headings = extractHeadings(html);
  const htmlWithIds = addHeadingIds(html, headings);
  const safeHtml = DOMPurify.sanitize(htmlWithIds);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-3">
            <TableOfContents headings={headings} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <article className="rounded-lg">
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center breadcrumbs space-x-2 text-sm mb-4">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>{post.title}</li>
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{formatDate(post.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{post.author?.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{getReadingTime(html)} min read</span>
                  </div>
                </div>
                {post.coverImage && (
                  <div className="rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src={`${post.coverImage}`}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
