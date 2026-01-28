"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboardStore } from '@/store/useDashboardStore';
import Sidebar from "@/components/sidebar/Sidebar";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const sidebarCollapsed = useDashboardStore((state) => state.sidebarCollapsed);
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
    <div className="min-h-screen bg-app text-app transition-colors duration-300">
      <Sidebar />
      <DashboardHeader />
      <main
        className={`pt-16 transition-all duration-300 min-h-screen ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>   
      <div className="p-8">{children}</div></main>
    </div>
  );
}
