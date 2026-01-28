"use client";

import { usePathname, useRouter } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getTitle = () => {
    if (pathname.includes("/notes")) return "Notes";
    if (pathname.includes("/todos")) return "Todos";
    if (pathname.includes("/worklogs")) return "Work Logs";
    return "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="h-14 border-b border-[var(--border)] flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold">
        {getTitle()}
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
