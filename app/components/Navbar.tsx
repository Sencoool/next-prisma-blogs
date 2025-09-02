"use client";

import Theme from "@components/Theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="navbar bg-base-200 shadow-sm px-5">
      {/* Left: Brand */}
      <div className="navbar-start">
        <Link
          className="text-xl font-semibold hover:text-green-500 transition-colors"
          href="/"
        >
          Jirablogs
        </Link>
      </div>

      {/* Center: Menu */}
      <div className="navbar-center">
        <ul className="menu menu-horizontal gap-2">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <li key={item.href} className={active ? "rounded-md" : ""}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    active
                      ? "text-green-600 dark:text-green-400 bg-green-500/10 font-medium"
                      : "hover:text-green-500"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: Theme switch */}
      <div className="navbar-end">
        <Theme />
      </div>
    </div>
  );
}
