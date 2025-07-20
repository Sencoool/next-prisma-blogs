import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Blogs",
  description: "A place where you create new blogs",
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="editor-container">
      <main>{children}</main>
    </div>
  );
}
