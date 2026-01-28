"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/sidebar/Sidebar";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  // 🔒 Prevent UI flash
  if (checkingAuth) {
    return null; // or a loader if you want
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
