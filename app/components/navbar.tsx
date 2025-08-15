import Theme from "@components/Theme";
import Link from "next/link";

// จะมาแก้ให้ทุกอย่างอยู่ตรงกลาง
// แก้ให้เมนูเรืองแสงเมื่ออยู่บนเมนูนั้นๆ

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 shadow-sm px-5">
      {/* Left side (Brand) */}
      <div className="flex-1">
        <Link
          className="text-xl normal-case hover:text-green-500 transition-colors"
          href="/"
        >
          Jirablogs
        </Link>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="hover:text-green-500 transition-colors" href="">
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
