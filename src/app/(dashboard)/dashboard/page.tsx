"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Video,
  Eye,
  Heart,
  Zap,
  Clock,
  ArrowUpRight,
  Play,
  Sparkles,
  Plus,
  BarChart3,
  Calendar,
  FileText,
  Mic,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, ViralScoreBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/badge";
import { formatNumber, timeAgo } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const analyticsData = [
  { date: "Mon", views: 12400, engagement: 840 },
  { date: "Tue", views: 18700, engagement: 1200 },
  { date: "Wed", views: 15300, engagement: 980 },
  { date: "Thu", views: 24100, engagement: 1680 },
  { date: "Fri", views: 31200, engagement: 2100 },
  { date: "Sat", views: 28400, engagement: 1900 },
  { date: "Sun", views: 35600, engagement: 2400 },
];

const recentVideos = [
  {
    id: "1",
    title: "7 Habits That Changed My Life Forever",
    platform: "TikTok",
    status: "published",
    views: 142000,
    viralScore: 87,
    thumbnail: "🎯",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Nobody Tells You This About Money",
    platform: "Instagram",
    status: "published",
    views: 89400,
    viralScore: 79,
    thumbnail: "💰",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "The Dark Side of Social Media",
    platform: "YouTube",
    status: "generating",
    views: 0,
    viralScore: 92,
    thumbnail: "📱",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "4",
    title: "AI Will Replace 80% of Jobs by 2030",
    platform: "TikTok",
    status: "scheduled",
    views: 0,
    viralScore: 85,
    thumbnail: "🤖",
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
  },
];

const trendingHooks = [
  {
    text: "Nobody tells men this…",
    curiosity: 94,
    retention: 89,
    emotional: 92,
  },
  {
    text: "This feels illegal to know.",
    curiosity: 98,
    retention: 91,
    emotional: 87,
  },
  {
    text: "You're wasting years doing this.",
    curiosity: 88,
    retention: 85,
    emotional: 94,
  },
  {
    text: "The internet doesn't want you to know this.",
    curiosity: 96,
    retention: 88,
    emotional: 90,
  },
];

const statsCards = [
  {
    label: "Total Views",
    value: "2.4M",
    change: "+23.5%",
    positive: true,
    icon: Eye,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Engagement Rate",
    value: "8.2%",
    change: "+1.4%",
    positive: true,
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    label: "Videos Generated",
    value: "47",
    change: "+12",
    positive: true,
    icon: Video,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "Viral Score Avg",
    value: "84",
    change: "+3.2",
    positive: true,
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

const quickActions = [
  { href: "/scripts", label: "Generate Script", icon: FileText, color: "from-purple-600 to-purple-800" },
  { href: "/hooks", label: "Create Hook", icon: Zap, color: "from-yellow-600 to-orange-700" },
  { href: "/videos", label: "Make Video", icon: Video, color: "from-blue-600 to-cyan-700" },
  { href: "/voiceover", label: "Add Voiceover", icon: Mic, color: "from-pink-600 to-rose-700" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "tiktok" | "instagram" | "youtube">("all");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-blue-900/40 border border-purple-500/20 p-6">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back, Creator! 👋
            </h1>
            <p className="text-zinc-400 text-sm">
              You have{" "}
              <span className="text-purple-400 font-semibold">3 videos</span>{" "}
              ready to post and{" "}
              <span className="text-blue-400 font-semibold">5 trending hooks</span>{" "}
              discovered today.
            </p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            className="hidden md:flex"
          >
            <Sparkles className="w-4 h-4" />
            Create Video
          </Button>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-blue-600/10 blur-2xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className={`text-xs font-medium ${stat.positive ? "text-green-400" : "text-red-400"} flex items-center gap-0.5`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${action.color} opacity-90 hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group`}
            >
              <div className="p-2 bg-white/10 rounded-lg">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">{action.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60 ml-auto group-hover:text-white transition-colors" />
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                Performance Overview
              </CardTitle>
              <div className="flex gap-1">
                {["7d", "30d", "90d"].map((period) => (
                  <button
                    key={period}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={analyticsData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatNumber(v)}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111113",
                      border: "1px solid rgba(168,85,247,0.3)",
                      borderRadius: "8px",
                      color: "#fafafa",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [formatNumber(Number(value))]}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                    name="Views"
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#engagementGradient)"
                    name="Engagement"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Credits & Plan */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-zinc-200">AI Credits</h3>
              <Badge variant="purple">Free Plan</Badge>
            </div>
            <div className="text-3xl font-bold text-white mb-1">47 <span className="text-zinc-500 text-lg font-normal">/ 100</span></div>
            <Progress value={47} className="mt-3 mb-4" />
            <div className="space-y-2 text-sm text-zinc-500">
              <div className="flex items-center justify-between">
                <span>Scripts generated</span>
                <span className="text-zinc-300">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Videos created</span>
                <span className="text-zinc-300">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Voiceovers</span>
                <span className="text-zinc-300">5</span>
              </div>
            </div>
            <Button variant="gradient" size="sm" className="w-full mt-4">
              Upgrade to Pro
            </Button>
          </Card>

          {/* Trending Hooks Preview */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Top Hooks Today
              </h3>
              <Link href="/hooks" className="text-xs text-purple-400 hover:text-purple-300">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {trendingHooks.slice(0, 3).map((hook, i) => (
                <div key={i} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <p className="text-sm text-zinc-200 mb-2 font-medium">&ldquo;{hook.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <span className="text-blue-400">🎯 {hook.curiosity}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-green-400">📈 {hook.retention}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-pink-400">❤️ {hook.emotional}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Videos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-400" />
            Recent Videos
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
              {(["all", "tiktok", "instagram", "youtube"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-3 py-1.5 rounded-md capitalize transition-all duration-150 ${
                    activeTab === tab
                      ? "bg-purple-600 text-white font-medium"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Link href="/videos">
              <Button variant="secondary" size="sm">
                <Plus className="w-3 h-3" />
                New Video
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {recentVideos
              .filter((v) => activeTab === "all" || v.platform.toLowerCase() === activeTab)
              .map((video) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-900 transition-colors group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-zinc-800 flex items-center justify-center text-2xl flex-shrink-0 group-hover:ring-2 group-hover:ring-purple-500/30 transition-all">
                    {video.thumbnail}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 truncate">{video.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="ghost" size="sm">{video.platform}</Badge>
                      {video.views > 0 && (
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatNumber(video.views)}
                        </span>
                      )}
                      <span className="text-xs text-zinc-600">{timeAgo(video.createdAt)}</span>
                    </div>
                  </div>

                  {/* Status + Score */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <ViralScoreBadge score={video.viralScore} size="sm" />
                    <Badge
                      variant={
                        video.status === "published"
                          ? "green"
                          : video.status === "generating"
                          ? "yellow"
                          : video.status === "scheduled"
                          ? "blue"
                          : "ghost"
                      }
                      size="sm"
                    >
                      {video.status === "generating" && (
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                      )}
                      {video.status}
                    </Badge>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Upcoming Posts
            </CardTitle>
            <Link href="/calendar" className="text-xs text-purple-400 hover:text-purple-300">
              View calendar →
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {[
              { title: "Morning Motivation", time: "9:00 AM", platform: "TikTok", day: "Tomorrow" },
              { title: "Finance Tip #47", time: "6:00 PM", platform: "Instagram", day: "Wed" },
              { title: "AI News Roundup", time: "12:00 PM", platform: "YouTube", day: "Thu" },
            ].map((post, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-zinc-800 last:border-0">
                <div className="text-center">
                  <div className="text-xs text-zinc-500">{post.day}</div>
                  <div className="text-sm font-bold text-zinc-200">{post.time}</div>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div className="flex-1">
                  <p className="text-sm text-zinc-200">{post.title}</p>
                  <p className="text-xs text-zinc-500">{post.platform}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {[
              {
                icon: "🔥",
                title: "Post during 7-9 PM for 3x more views",
                type: "Timing",
                priority: "high",
              },
              {
                icon: "💡",
                title: "Controversy hook performs 47% better in your niche",
                type: "Hook Style",
                priority: "high",
              },
              {
                icon: "📈",
                title: "Add text overlay for 28% retention boost",
                type: "Visual",
                priority: "medium",
              },
              {
                icon: "🎵",
                title: "Trending audio: add for 2x discovery boost",
                type: "Audio",
                priority: "medium",
              },
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-zinc-800 last:border-0">
                <div className="text-xl">{rec.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-200">{rec.title}</p>
                  <Badge
                    variant={rec.priority === "high" ? "purple" : "ghost"}
                    size="sm"
                    className="mt-1"
                  >
                    {rec.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
