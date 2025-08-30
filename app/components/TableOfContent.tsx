"use client";

type Heading = {
  level: number;
  text: string;
  id: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    headingId: string
  ) => {
    e.preventDefault();
    document.getElementById(headingId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="sticky top-8 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        📑 Table of Contents
      </h2>
      {headings.length > 0 ? (
        <nav className="space-y-2">
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              className={`block text-sm hover:text-green-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                heading.level === 1
                  ? "font-medium text-gray-900 dark:text-white"
                  : heading.level === 2
                  ? "text-gray-700 dark:text-gray-300 ml-3"
                  : "text-gray-600 dark:text-gray-400 ml-6"
              }`}
              onClick={(e) => handleScroll(e, heading.id)}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No headings found in content
        </p>
      )}
    </div>
  );
}
