import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Post | Jirablogs",
  description: "A place where you create new posts",
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
