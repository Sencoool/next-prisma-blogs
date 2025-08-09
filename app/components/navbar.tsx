import Theme from "./Theme";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      {/* Left side (Brand) */}
      <div className="flex-1">
        <Link className="text-xl normal-case" href="/">
          Brand
        </Link>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="hover:text-blue-500" href="/">
              Posts
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" href="">
              About
            </Link>
          </li>
        </ul>
      </div>
      {/* Right side (Theme Switcher) */}
      <div className="flex-none">
        <Theme />
      </div>
    </div>
  );
}
