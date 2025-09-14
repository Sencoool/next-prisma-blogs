import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET env var");
  return new TextEncoder().encode(secret);
}

export const metadata: Metadata = {
  title: "Create New Post | Jirablogs",
  description: "A place where you create new posts",
};

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const role = payload.role as string | undefined;
    if (role !== "WRITER") {
      redirect("/");
    }
  } catch (e) {
    redirect("/");
  }

  return (
    <div className="editor-container">
      <main>{children}</main>
    </div>
  );
}
