"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Zap,
  Video,
  Mic,
  BarChart3,
  TrendingUp,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    group: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/scripts", label: "Script Generator", icon: FileText },
      { href: "/hooks", label: "Hook Engine", icon: Zap },
      { href: "/videos", label: "Video Generator", icon: Video },
      { href: "/voiceover", label: "Voiceover", icon: Mic },
    ],
  },
  {
    group: "Growth",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/trends", label: "Trend Engine", icon: TrendingUp },
      { href: "/calendar", label: "Content Calendar", icon: Calendar },
    ],
  },
  {
    group: "Account",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-[#0c0c0e] border-r border-zinc-800/50 flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-zinc-800/50">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center neon-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">ViralForge</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navItems.map((group) => (
          <div key={group.group} className="mb-6">
            {!collapsed && (
              <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-2 px-2">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "sidebar-item",
                    isActive && "active",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-purple-400" : "")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Credits Bar */}
      {!collapsed && (
        <div className="px-3 pb-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 font-medium">AI Credits</span>
              <span className="text-xs text-purple-400 font-bold">47 / 100</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[47%] bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
            </div>
            <Link
              href="/pricing"
              className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <CreditCard className="w-3 h-3" />
              Upgrade plan
            </Link>
          </div>
        </div>
      )}

      {/* User */}
      <div className={cn("h-16 flex items-center border-t border-zinc-800/50 px-4 gap-3", collapsed && "justify-center")}>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">Creator</p>
            <p className="text-xs text-zinc-500 truncate">Free Plan</p>
          </div>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-zinc-400" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-zinc-400" />
        )}
      </button>
    </aside>
  );
}
