"use client";

import Link from "next/link";

type Heading = {
  level: number;
  text: string;
  id: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elememt = document.getElementById(id);
    if (elememt) {
      elememt.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="sticky top-8 p-6">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        📑 สารบัญ
      </h2>
      {headings.length > 0 ? (
        <nav className="space-y-2">
          {headings.map((heading, index) => (
            <Link
              key={index}
              href={`#${heading.id}`}
              className={`block text-sm hover:text-green-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-200 ${
                heading.level === 1
                  ? "font-medium"
                  : heading.level === 2
                  ? "ml-3"
                  : "ml-6"
              }`}
              onClick={(e) => handleScroll(e, heading.id)}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      ) : (
        <p className="text-sm">No headings found in content</p>
      )}
    </div>
  );
}
