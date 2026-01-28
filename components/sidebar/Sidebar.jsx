'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Notes', href: '/dashboard/notes', icon: BarChart3 },
  { name: 'Tasks', href: '/dashboard/todos', icon: Layers },
  { name: 'Worklogs', href: '/dashboard/worklogs', icon: Users },
  // { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-app bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-app">
        {!sidebarCollapsed && (
          <h1 className="text-2xl font-display font-semibold tracking-tight animate-fade-in">
            MiniDesk
          </h1>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-accent transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent hover:scale-[1.02] ${
                isActive
                  ? 'bg-accent text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon
                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                  sidebarCollapsed ? 'mx-auto' : 'mr-3'
                }`}
              />

              {!sidebarCollapsed && (
                <span className="animate-fade-in">{item.name}</span>
              )}

              {isActive && !sidebarCollapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-scale-in" />
              )}
            </Link>
          );
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="border-t border-app p-4 animate-fade-in">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 MiniDesk Dashboard
          </p>
        </div>
      )}
    </aside>
  );
}
