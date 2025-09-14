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
            สถานที่แบ่งปันแนวคิด บทเรียน
            และเรื่องราวเกี่ยวกับการพัฒนาเว็บและโลกของเรา
          </p>
        </header>

        {/* Mission / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-2">หน้าที่ของเรา</h3>
            <p className="text-base-content/70">
              ให้ความรู้และแรงบันดาลใจแก่ชุมชนการพัฒนาเว็บและโลกของเรา
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-2">สิ่งที่คุณจะพบ</h3>
            <p className="text-base-content/70">
              บทความเกี่ยวกับการพัฒนาเว็บ เทคโนโลยี และอื่นๆ
              อีกมากมายเกี่ยวกับโลกใบนี้
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-2">หลักการ</h3>
            <p className="text-base-content/70">
              เราเชื่อในการเรียนรู้ตลอดชีวิต
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
            <h3 className="text-lg font-semibold">เริ่มอ่าน</h3>
            <p className="text-base-content/70">ดำดิ่งสู่บทความล่าสุด</p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="btn btn-success btn-sm">
              เริ่มอ่าน
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
