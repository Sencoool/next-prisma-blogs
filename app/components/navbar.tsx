import Theme from "./Theme";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl hover:text-blue-500" href="/">
          JiraBlogs
        </Link>
      </div>
      <div className="flex-none">
        <Theme />
      </div>
    </div>
  );
}
