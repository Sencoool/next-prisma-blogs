import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Jirablogs",
  description:
    "Learn more about Jirablogs — a clean, fast, and developer-friendly blog built with Next.js and Prisma.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About Jirablogs
          </h1>
          <p className="mt-3 text-base-content/70 text-lg">
            A place to share ideas, tutorials, and stories about building for
            the web.
          </p>
        </header>

        {/* Mission / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
            <p className="text-base-content/70">
              Make learning web development approachable with practical,
              hands-on content.
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-2">What You’ll Find</h3>
            <p className="text-base-content/70">
              Articles on web development, tech stack, and more.
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-2">Principles</h3>
            <p className="text-base-content/70">
              Clarity over cleverness. Real-world code.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Prisma",
              "PostgreSQL",
              "DaisyUI",
              "Vercel",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-base-300 bg-base-200 text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl border border-base-300 bg-base-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Start reading</h3>
            <p className="text-base-content/70">
              Dive into the latest posts and tutorials.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="btn btn-success btn-sm">
              Start Reading
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
