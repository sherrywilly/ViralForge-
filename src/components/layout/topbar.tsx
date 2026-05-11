"use client";

import { Bell, Search, Sparkles, ChevronDown } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function TopBar() {
  return (
    <header className="h-16 bg-[#09090b]/80 backdrop-blur-sm border-b border-zinc-800/50 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-80 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input
          type="text"
          placeholder="Search scripts, videos, trends..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Generate CTA */}
        <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <Sparkles className="w-4 h-4" />
          Generate Video
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
          <Bell className="w-4 h-4 text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>

        {/* User */}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9",
            },
          }}
        />
      </div>
    </header>
  );
}
