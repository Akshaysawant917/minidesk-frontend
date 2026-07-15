"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FileText,
  Clock,
  Settings,
  Lock,
  Bookmark,
  Briefcase,
  Key,
  File,
  Terminal,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";

import { useDashboardStore } from "@/store/useDashboardStore";

const mainNavigation = [
  // ✅ Active main items
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/dashboard/todos", icon: Layers },
  { name: "Notes", href: "/dashboard/notes", icon: FileText },
  { name: "Worklogs", href: "/dashboard/worklogs", icon: Clock },
  { name: "Commands",href: "/dashboard/commands", icon: Terminal },
  { name: "Bookmarks",href: "/dashboard/bookmarks", icon: Bookmark },
  { name: "Job Tracker",href: "/dashboard/jobs", icon: BriefcaseBusiness, },

  // 🚧 Coming Soon
  // { name: "Secret Notes", icon: Lock, comingSoon: true },

  { name: "Documents Vault", icon: File, comingSoon: true },
  // { name: "Password Vault", icon: Key, comingSoon: true },
];

const bottomNavigation = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-app bg-background/95 backdrop-blur-sm transition-all duration-300 flex flex-col ${sidebarCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-app flex-shrink-0">
        {!sidebarCollapsed && (
          <h1 className="text-2xl font-semibold tracking-tight">
            MiniDesk
          </h1>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-accent ml-auto transition-colors"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Scrollable Navigation Area */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-6 space-y-1 scrollbar-thin scrollbar-thumb-app scrollbar-track-transparent hover:scrollbar-thumb-primary/30">
        {mainNavigation.map((item, index) => {
          const Icon = item.icon;

          // 🚧 Coming soon items
          if (item.comingSoon) {
            return (
              <div
                key={item.name}
                className="group flex items-center rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground opacity-60 cursor-not-allowed"
                title={`${item.name} - Coming Soon`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${sidebarCollapsed ? "mx-auto" : "mr-3"
                    }`}
                />

                {!sidebarCollapsed && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-accent flex-shrink-0">
                      soon
                    </span>
                  </div>
                )}
              </div>
            );
          }

          // ✅ Active items
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-accent ${isActive
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${sidebarCollapsed ? "mx-auto" : "mr-3"
                  }`}
              />

              {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - Settings & Footer */}
      <div className="flex-shrink-0 border-t border-app">
        {/* Settings */}
        <div className="px-3 py-3">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-accent ${isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${sidebarCollapsed ? "mx-auto" : "mr-3"
                    }`}
                />

                {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-app">
            <p className="text-xs text-muted-foreground">
              © 2026 MiniDesk
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}