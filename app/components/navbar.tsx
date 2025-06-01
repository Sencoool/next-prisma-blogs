import Theme from "./theme";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <a className="btn btn-ghost text-xl">JiraBlogs</a>
      <Theme />
    </div>
  );
}
