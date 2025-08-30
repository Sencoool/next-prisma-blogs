import { generateHTML } from "@tiptap/html/server";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import type { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import TableOfContents from "@/app/components/TableOfContent";

const baseUrl = process.env.API_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blogs = await getBlogs(parseInt(id));

  return {
    title: blogs.title,
  };
}

async function getBlogs(id: number) {
  try {
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

// Function to extract headings from HTML content
function extractHeadings(htmlContent: string) {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ""); // Remove HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ level, text, id });
  }

  return headings;
}

// Function to add IDs to headings in HTML content
function addHeadingIds(
  htmlContent: string,
  headings: { level: number; text: string; id: string }[]
) {
  let modifiedContent = htmlContent;

  headings.forEach((heading) => {
    const originalHeading = `<h${heading.level}[^>]*>${heading.text.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )}</h${heading.level}>`;
    const newHeading = `<h${heading.level} id="${heading.id}" class="scroll-mt-20">${heading.text}</h${heading.level}>`;
    modifiedContent = modifiedContent.replace(
      new RegExp(originalHeading, "i"),
      newHeading
    );
  });

  return modifiedContent;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogs(parseInt(id));

  // Add every Extensions that use with RTE
  const extensions = [StarterKit, Image];

  let postContentHTML = "";

  // Checking if post is String or JSON
  if (post && post.content) {
    try {
      postContentHTML = generateHTML(post.content, extensions);
    } catch (e) {
      console.error("Error parsing or generating HTML from Tiptap JSON:", e);
      postContentHTML = "<p>Error loading content.</p>";
    }
  }

  // Extract headings for TOC
  const headings = extractHeadings(postContentHTML);

  // Add IDs to headings for smooth scrolling
  const contentWithIds = addHeadingIds(postContentHTML, headings);

  const purifyContentHTML = DOMPurify.sanitize(contentWithIds);

  // Format the post date
  const postDate = new Date(post.updatedAt);
  const day = postDate.getDate();
  const month = postDate.toLocaleString("default", { month: "long" });
  const year = postDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  // Calculate reading time (assuming 200 words per minute)
  const wordCount = postContentHTML.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen">
      {/* Header/Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-width-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <a href="/" className="hover:text-green-500">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="truncate">{post?.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents - Left Sidebar */}
          <div className="lg:col-span-3">
            <TableOfContents headings={headings} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-7">
            <article className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              {/* Blog Header */}
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post?.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{post?.author?.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                {/* Featured Image */}
                {post?.coverImage && (
                  <div className="rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src={`/uploads/${post.coverImage}`}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: purifyContentHTML }}
                  />
                </div>

                {/* Tags and Share - Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    {/* Tags */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        🏷️ Tags:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {/* You can replace these with actual tags from your post data */}
                        <span className="px-3 py-1 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                          Web Development
                        </span>
                        <span className="px-3 py-1 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                          Tutorial
                        </span>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        📤 Share:
                      </h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-1  text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                          Facebook
                        </button>
                        <button className="px-3 py-1  text-sky-700 dark:text-sky-300 rounded text-xs hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors">
                          Twitter
                        </button>
                        <button className="px-3 py-1  text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                          LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              {/* Related Articles */}
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  📄 Related Articles
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline line-clamp-2"
                  >
                    How to Build Better UIs
                  </a>
                  <a
                    href="#"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline line-clamp-2"
                  >
                    Modern CSS Techniques
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
