"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const viewsData = [
  { date: "May 1", views: 8200, followers: 120 },
  { date: "May 5", views: 14500, followers: 210 },
  { date: "May 9", views: 11200, followers: 180 },
  { date: "May 13", views: 24100, followers: 350 },
  { date: "May 17", views: 31200, followers: 480 },
  { date: "May 21", views: 28400, followers: 420 },
  { date: "May 25", views: 45600, followers: 720 },
  { date: "May 29", views: 38200, followers: 580 },
  { date: "Jun 2", views: 52100, followers: 890 },
  { date: "Jun 6", views: 61400, followers: 1050 },
];

const platformData = [
  { platform: "TikTok", views: 142000, engagement: 8.2 },
  { platform: "Instagram", views: 89000, engagement: 6.5 },
  { platform: "YouTube", views: 45000, engagement: 4.8 },
  { platform: "Twitter", views: 12000, engagement: 3.2 },
];

const retentionData = [
  { second: 0, retention: 100 },
  { second: 5, retention: 82 },
  { second: 10, retention: 71 },
  { second: 15, retention: 65 },
  { second: 20, retention: 58 },
  { second: 25, retention: 52 },
  { second: 30, retention: 47 },
  { second: 45, retention: 38 },
  { second: 60, retention: 31 },
];

const topVideos = [
  { title: "7 Habits That Changed My Life", views: 142000, likes: 18400, comments: 2100, viralScore: 87, trend: "up" },
  { title: "Nobody Tells You This About Money", views: 89400, likes: 12300, comments: 1400, viralScore: 79, trend: "up" },
  { title: "The Dark Side of Social Media", views: 67200, likes: 9800, comments: 890, viralScore: 73, trend: "down" },
  { title: "AI Will Replace 80% of Jobs", views: 54100, likes: 8200, comments: 1200, viralScore: 85, trend: "up" },
  { title: "Morning Routine That Changed Everything", views: 38700, likes: 5600, comments: 670, viralScore: 68, trend: "stable" },
];

const pieColors = ["#a855f7", "#3b82f6", "#22c55e", "#f59e0b"];

const statsMetrics = [
  { label: "Total Views", value: "2.4M", change: "+23.5%", positive: true, icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Followers Gained", value: "+4,821", change: "+12.3%", positive: true, icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Avg. Watch Time", value: "38s", change: "+8.1%", positive: true, icon: Clock, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Engagement Rate", value: "8.2%", change: "-0.4%", positive: false, icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10" },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-green-500/15 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            Analytics Dashboard
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Track your content performance across all platforms
          </p>
        </div>
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {(["7d", "30d", "90d"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                timeframe === t
                  ? "bg-purple-600 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsMetrics.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Views & Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="followersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                <Tooltip
                  contentStyle={{ background: "#111113", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "8px", color: "#fafafa", fontSize: "12px" }}
                  formatter={(v) => [formatNumber(Number(v)), String(v)]}
                />
                <Area type="monotone" dataKey="views" stroke="#a855f7" strokeWidth={2} fill="url(#viewsGrad)" />
                <Area type="monotone" dataKey="followers" stroke="#22c55e" strokeWidth={2} fill="url(#followersGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={platformData}
                  dataKey="views"
                  nameKey="platform"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {platformData.map((_, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#111113", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(v) => [formatNumber(Number(v)), "Views"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {platformData.map((item, i) => (
                <div key={item.platform} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: pieColors[i] }} />
                    <span className="text-xs text-zinc-400">{item.platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">{item.engagement}% eng.</span>
                    <span className="text-xs font-medium text-zinc-300">{formatNumber(item.views)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Retention Curve */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Average Retention Curve
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={retentionData}>
              <defs>
                <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis
                dataKey="second"
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}s`}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{ background: "#111113", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "8px", color: "#fafafa", fontSize: "12px" }}
                formatter={(v) => [`${Number(v)}%`, "Retention"]}
                labelFormatter={(v) => `At ${v}s`}
              />
              <Area type="monotone" dataKey="retention" stroke="#3b82f6" strokeWidth={2} fill="url(#retentionGrad)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Hook holds well (0-10s)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Mid-video drop (15-30s)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Ending weak (45s+)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Top Performing Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-zinc-600 border-b border-zinc-800">
                  <th className="text-left py-3 font-medium">#</th>
                  <th className="text-left py-3 font-medium">Video</th>
                  <th className="text-right py-3 font-medium">Views</th>
                  <th className="text-right py-3 font-medium">Likes</th>
                  <th className="text-right py-3 font-medium">Comments</th>
                  <th className="text-right py-3 font-medium">Viral Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {topVideos.map((video, i) => (
                  <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 text-zinc-600">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-300 font-medium max-w-[250px] truncate">{video.title}</span>
                        {video.trend === "up" && <ArrowUpRight className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                        {video.trend === "down" && <ArrowDownRight className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                      </div>
                    </td>
                    <td className="py-3 text-right text-zinc-400">{formatNumber(video.views)}</td>
                    <td className="py-3 text-right text-zinc-400">{formatNumber(video.likes)}</td>
                    <td className="py-3 text-right text-zinc-400">{formatNumber(video.comments)}</td>
                    <td className="py-3 text-right">
                      <span className={`font-bold ${video.viralScore >= 80 ? "text-green-400" : video.viralScore >= 60 ? "text-yellow-400" : "text-orange-400"}`}>
                        {video.viralScore >= 90 ? "🔥" : video.viralScore >= 75 ? "🚀" : "⚡"} {video.viralScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
