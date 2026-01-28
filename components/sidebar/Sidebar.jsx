"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname.startsWith(path);

  const linkClass = (path) =>
    `block px-3 py-2 rounded text-sm ${
      isActive(path)
        ? "bg-[var(--primary)] text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-56 border-r border-[var(--border)] p-4">
      <h1 className="text-lg font-semibold mb-6">
        MiniDesk
      </h1>

      <nav className="space-y-1">
        <Link href="/dashboard/notes" className={linkClass("/dashboard/notes")}>
          Notes
        </Link>

        <Link href="/dashboard/todos" className={linkClass("/dashboard/todos")}>
          Todos
        </Link>

        <Link
          href="/dashboard/worklogs"
          className={linkClass("/dashboard/worklogs")}
        >
          Work Logs
        </Link>
      </nav>
    </aside>
  );
}
