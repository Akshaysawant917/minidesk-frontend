'use client';

import { Sun, Moon, Bell, Search, User } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
// import { DigitalClock } from '@/components/DigitalClock';
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { theme, toggleTheme, sidebarCollapsed } = useDashboardStore();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  const handleProfile = ()=>{
    router.push("/dashboard/settings");
  }
  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 border-b border-app bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        sidebarCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Clock + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          {/* Digital Clock */}
         

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-accent/50 border border-app rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
           {/* <DigitalClock /> */}
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-lg hover:bg-accent transition-all hover:scale-105 group cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute inset-2.5 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 rounded-lg hover:bg-accent transition-all hover:scale-105 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
            {/* <Bell className="h-5 w-5" /> */}
            {/* <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" /> */}
          </button>

          {/* Profile */}
          <button
            className="flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-lg hover:bg-accent transition-all hover:scale-105 cursor-pointer"
            aria-label="Profile"
            onClick={handleProfile}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">User</p>
              {/* <p className="text-xs text-muted-foreground">Admin</p> */}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
