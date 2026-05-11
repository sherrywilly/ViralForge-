"use client";

import { useState } from "react";
import { TrendingUp, Flame, Zap, ExternalLink, RefreshCw, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

const TRENDING_DATA = [
  {
    id: "1",
    title: "AI replacing jobs in 2025",
    description: "Massive trend about artificial intelligence and automation in the workforce",
    platform: "TikTok",
    trendScore: 96,
    competitionLevel: "medium" as const,
    viralPotential: 92,
    hashtags: ["AI", "Jobs", "Future", "Automation"],
    growth: 340,
    niche: "AI News",
    category: "Technology",
  },
  {
    id: "2",
    title: "Silent walking trend",
    description: "Walking without phone or music for mental clarity - huge wellness trend",
    platform: "Instagram",
    trendScore: 88,
    competitionLevel: "low" as const,
    viralPotential: 85,
    hashtags: ["SilentWalking", "Wellness", "Mindfulness"],
    growth: 220,
    niche: "Fitness",
    category: "Wellness",
  },
  {
    id: "3",
    title: "Day trading secrets exposed",
    description: "Finance creators are blowing up with 'hidden' trading strategies",
    platform: "YouTube",
    trendScore: 91,
    competitionLevel: "high" as const,
    viralPotential: 78,
    hashtags: ["DayTrading", "Finance", "Money", "Stocks"],
    growth: 180,
    niche: "Finance",
    category: "Finance",
  },
  {
    id: "4",
    title: "Dark psychology techniques",
    description: "Psychological manipulation and influence tactics gaining massive traction",
    platform: "TikTok",
    trendScore: 94,
    competitionLevel: "medium" as const,
    viralPotential: 89,
    hashtags: ["Psychology", "DarkPsychology", "Manipulation"],
    growth: 290,
    niche: "Business",
    category: "Psychology",
  },
  {
    id: "5",
    title: "Quiet luxury aesthetic",
    description: "Understated luxury and old money aesthetics dominating fashion and lifestyle",
    platform: "Instagram",
    trendScore: 82,
    competitionLevel: "high" as const,
    viralPotential: 74,
    hashtags: ["QuietLuxury", "OldMoney", "Aesthetic"],
    growth: 150,
    niche: "Luxury",
    category: "Lifestyle",
  },
  {
    id: "6",
    title: "Gym motivation transformation",
    description: "Before/after fitness transformation content hitting record engagement",
    platform: "TikTok",
    trendScore: 79,
    competitionLevel: "high" as const,
    viralPotential: 71,
    hashtags: ["GymMotivation", "Transformation", "Fitness"],
    growth: 120,
    niche: "Fitness",
    category: "Fitness",
  },
];

const PLATFORMS = ["All", "TikTok", "Instagram", "YouTube", "Twitter"];

function TrendCard({ trend }: { trend: typeof TRENDING_DATA[0] }) {
  const competitionColors = {
    low: { badge: "green" as const, label: "Low Competition" },
    medium: { badge: "yellow" as const, label: "Medium Competition" },
    high: { badge: "red" as const, label: "High Competition" },
  };

  const comp = competitionColors[trend.competitionLevel];

  return (
    <div className="trend-card group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-zinc-200">{trend.title}</h3>
            {trend.trendScore >= 90 && (
              <Flame className="w-4 h-4 text-orange-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">{trend.description}</p>
        </div>
        <div className="ml-3 text-right">
          <div className={`text-xl font-black ${
            trend.trendScore >= 90 ? "text-green-400" : trend.trendScore >= 75 ? "text-yellow-400" : "text-orange-400"
          }`}>
            {trend.trendScore}
          </div>
          <div className="text-xs text-zinc-600">trend</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="ghost" size="sm">{trend.platform}</Badge>
        <Badge variant="purple" size="sm">{trend.niche}</Badge>
        <Badge variant={comp.badge} size="sm">{comp.label}</Badge>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          { label: "Trend Score", value: trend.trendScore, color: "#a855f7" },
          { label: "Viral Potential", value: trend.viralPotential, color: "#3b82f6" },
          { label: "Growth", value: null, growth: trend.growth, color: "#22c55e" },
        ].map((metric) => (
          <div key={metric.label} className="bg-zinc-900/60 rounded-lg p-2 text-center">
            <div className={`text-sm font-bold`} style={{ color: metric.color }}>
              {metric.growth ? `+${metric.growth}%` : metric.value}
            </div>
            <div className="text-xs text-zinc-600 mt-0.5">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {trend.hashtags.map((tag) => (
          <span key={tag} className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2 py-0.5">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="gradient" size="sm" className="flex-1">
          <Zap className="w-3.5 h-3.5" />
          Create Content
        </Button>
        <Button variant="secondary" size="sm">
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function TrendsPage() {
  const [activePlatform, setActivePlatform] = useState("All");
  const [loading, setLoading] = useState(false);

  const filtered = TRENDING_DATA.filter(
    (t) => activePlatform === "All" || t.platform === activePlatform
  );

  const refreshTrends = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-orange-500/15 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            Trend Detection Engine
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Real-time viral trends across TikTok, Instagram, YouTube, and Twitter
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={refreshTrends}
          loading={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Trends
        </Button>
      </div>

      {/* Live Trend Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { platform: "🎵 TikTok", count: 847, label: "Trending sounds", color: "text-pink-400", bg: "bg-pink-500/10" },
          { platform: "📸 Instagram", count: 234, label: "Viral formats", color: "text-purple-400", bg: "bg-purple-500/10" },
          { platform: "▶️ YouTube", count: 156, label: "Trending topics", color: "text-red-400", bg: "bg-red-500/10" },
          { platform: "𝕏 Twitter", count: 412, label: "Hot hashtags", color: "text-blue-400", bg: "bg-blue-500/10" },
        ].map((item) => (
          <Card key={item.platform} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{item.platform}</span>
              <span className="ml-auto flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500">Live</span>
              </span>
            </div>
            <div className={`text-2xl font-bold ${item.color}`}>{formatNumber(item.count)}</div>
            <div className="text-xs text-zinc-600">{item.label}</div>
          </Card>
        ))}
      </div>

      {/* Platform Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => setActivePlatform(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activePlatform === p
                ? "bg-orange-600 text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>

      {/* Trending Hashtags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Trending Hashtags Right Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "#AI", "#ChatGPT", "#Motivation", "#Finance",
              "#DayTrading", "#SilentWalking", "#FitTok",
              "#Psychology", "#QuietLuxury", "#Mindset",
              "#Entrepreneur", "#Aesthetic", "#Glow Up",
              "#SelfImprovement", "#MoneyTips",
            ].map((tag, i) => (
              <button
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300 transition-all"
              >
                <span className="text-orange-400 text-xs font-bold">#{i + 1}</span>
                {tag}
                <span className="text-xs text-zinc-600">+{Math.floor(Math.random() * 200 + 50)}%</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
