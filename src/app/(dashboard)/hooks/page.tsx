"use client";

import { useState } from "react";
import { Zap, Copy, Sparkles, TrendingUp, Eye, Heart, Filter, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NICHES } from "@/lib/utils";
import { toast } from "sonner";

interface Hook {
  id: string;
  text: string;
  curiosityScore: number;
  retentionScore: number;
  emotionalImpactScore: number;
  overallScore: number;
  category: string;
  platform: string;
}

const EXAMPLE_HOOKS: Hook[] = [
  {
    id: "1",
    text: "Nobody tells men this, but your 20s could make or break your entire life.",
    curiosityScore: 94,
    retentionScore: 89,
    emotionalImpactScore: 92,
    overallScore: 91,
    category: "Curiosity",
    platform: "TikTok",
  },
  {
    id: "2",
    text: "This feels illegal to know. The wealth formula they don't teach in school.",
    curiosityScore: 98,
    retentionScore: 91,
    emotionalImpactScore: 87,
    overallScore: 93,
    category: "Secret",
    platform: "Instagram",
  },
  {
    id: "3",
    text: "You're wasting years doing this every morning. Stop immediately.",
    curiosityScore: 88,
    retentionScore: 85,
    emotionalImpactScore: 94,
    overallScore: 89,
    category: "Warning",
    platform: "YouTube",
  },
  {
    id: "4",
    text: "The internet doesn't want you to know this productivity hack.",
    curiosityScore: 96,
    retentionScore: 88,
    emotionalImpactScore: 90,
    overallScore: 91,
    category: "Forbidden",
    platform: "TikTok",
  },
  {
    id: "5",
    text: "I went from $0 to $10k/month in 90 days. Here's exactly what I did.",
    curiosityScore: 85,
    retentionScore: 92,
    emotionalImpactScore: 88,
    overallScore: 88,
    category: "Story",
    platform: "Instagram",
  },
  {
    id: "6",
    text: "Most people will scroll past this. The ones who watch will thank me later.",
    curiosityScore: 90,
    retentionScore: 94,
    emotionalImpactScore: 85,
    overallScore: 90,
    category: "Challenge",
    platform: "TikTok",
  },
];

const HOOK_CATEGORIES = [
  { id: "all", label: "All Hooks" },
  { id: "curiosity", label: "Curiosity" },
  { id: "secret", label: "Secret" },
  { id: "warning", label: "Warning" },
  { id: "story", label: "Story" },
  { id: "challenge", label: "Challenge" },
  { id: "forbidden", label: "Forbidden" },
];

function ScoreRing({ value, label, color }: { value: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

  return (
    <div className="text-center">
      <div className="relative w-12 h-12 mx-auto">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#27272a" strokeWidth="3" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{value}</span>
        </div>
      </div>
      <p className="text-xs text-zinc-600 mt-1">{label}</p>
    </div>
  );
}

function HookCard({ hook, onCopy }: { hook: Hook; onCopy: (text: string) => void }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getCategoryVariant = (cat: string) => {
    const map: Record<string, "purple" | "blue" | "green" | "yellow" | "red"> = {
      Curiosity: "purple",
      Secret: "blue",
      Warning: "red",
      Story: "green",
      Challenge: "yellow",
      Forbidden: "red",
    };
    return map[cat] || "ghost";
  };

  return (
    <Card className="p-4 hover:border-purple-500/40 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-sm text-zinc-200 font-medium leading-relaxed flex-1">
          &ldquo;{hook.text}&rdquo;
        </p>
        <button
          onClick={() => onCopy(hook.text)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 rounded"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant={getCategoryVariant(hook.category) as "purple" | "blue" | "green" | "yellow" | "red"} size="sm">
          {hook.category}
        </Badge>
        <Badge variant="ghost" size="sm">
          {hook.platform}
        </Badge>
        <div className="ml-auto">
          <span className={`text-sm font-bold ${getScoreColor(hook.overallScore)}`}>
            {hook.overallScore >= 90 ? "🔥" : hook.overallScore >= 75 ? "🚀" : "⚡"} {hook.overallScore}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-around pt-3 border-t border-zinc-800">
        <ScoreRing value={hook.curiosityScore} label="Curiosity" color="#a855f7" />
        <ScoreRing value={hook.retentionScore} label="Retention" color="#3b82f6" />
        <ScoreRing value={hook.emotionalImpactScore} label="Impact" color="#ec4899" />
      </div>
    </Card>
  );
}

export default function HookEnginePage() {
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<Hook[]>(EXAMPLE_HOOKS);
  const [formData, setFormData] = useState({
    niche: "",
    topic: "",
    count: "6",
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"overall" | "curiosity" | "retention" | "emotional">("overall");

  const handleGenerate = async () => {
    if (!formData.niche || !formData.topic) {
      toast.error("Please fill in niche and topic");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate hooks");

      const data = await response.json();
      setHooks(data.hooks);
      toast.success(`Generated ${data.hooks.length} viral hooks! 🎯`);
    } catch {
      toast.error("Failed to generate hooks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Hook copied to clipboard!");
  };

  const filteredHooks = hooks
    .filter(
      (h) =>
        activeCategory === "all" ||
        h.category.toLowerCase() === activeCategory.toLowerCase()
    )
    .sort((a, b) => {
      const scoreMap = {
        overall: "overallScore",
        curiosity: "curiosityScore",
        retention: "retentionScore",
        emotional: "emotionalImpactScore",
      } as const;
      return b[scoreMap[sortBy]] - a[scoreMap[sortBy]];
    });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-yellow-500/15 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            Viral Hook Engine
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Generate addictive hooks with curiosity, retention, and emotional impact scoring
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-purple-500/50"
          >
            <option value="overall">Sort: Overall</option>
            <option value="curiosity">Sort: Curiosity</option>
            <option value="retention">Sort: Retention</option>
            <option value="emotional">Sort: Emotional</option>
          </select>
        </div>
      </div>

      {/* Generator Form */}
      <Card className="p-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Select
              placeholder="Select niche..."
              options={NICHES.map((n) => ({
                value: n.id,
                label: `${n.emoji} ${n.label}`,
              }))}
              value={formData.niche}
              onChange={(v) => setFormData({ ...formData, niche: v })}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <Input
              placeholder="Enter topic or angle..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>
          <div className="w-32">
            <Select
              options={[
                { value: "3", label: "3 hooks" },
                { value: "6", label: "6 hooks" },
                { value: "10", label: "10 hooks" },
                { value: "15", label: "15 hooks" },
              ]}
              value={formData.count}
              onChange={(v) => setFormData({ ...formData, count: v })}
            />
          </div>
          <Button
            variant="gradient"
            onClick={handleGenerate}
            loading={loading}
          >
            <Zap className="w-4 h-4" />
            Generate Hooks
          </Button>
        </div>
      </Card>

      {/* Hook Score Legend */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Eye, label: "Curiosity Score", desc: "How much it makes viewers want to know more", color: "text-purple-400", bg: "bg-purple-500/10" },
          { icon: TrendingUp, label: "Retention Score", desc: "How well it keeps viewers watching", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: Heart, label: "Emotional Impact", desc: "How strongly it triggers emotional response", color: "text-pink-400", bg: "bg-pink-500/10" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`flex items-center gap-3 p-3 rounded-lg ${item.bg} border border-white/5`}>
              <div className={`p-2 rounded-lg bg-black/20`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <div className={`text-xs font-semibold ${item.color}`}>{item.label}</div>
                <div className="text-xs text-zinc-600 mt-0.5">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {HOOK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 ${
              activeCategory === cat.id
                ? "bg-purple-600 text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hooks Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: parseInt(formData.count) }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl skeleton" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHooks.map((hook) => (
            <HookCard key={hook.id} hook={hook} onCopy={copyToClipboard} />
          ))}
        </div>
      )}

      {/* Top Hook Breakdown */}
      {filteredHooks.length > 0 && !loading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Top Performing Hook Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <p className="text-lg font-medium text-zinc-200 mb-2">
                  &ldquo;{filteredHooks[0]?.text}&rdquo;
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Curiosity Score", value: filteredHooks[0]?.curiosityScore, color: "from-purple-600 to-purple-800" },
                    { label: "Retention Score", value: filteredHooks[0]?.retentionScore, color: "from-blue-600 to-blue-800" },
                    { label: "Emotional Impact", value: filteredHooks[0]?.emotionalImpactScore, color: "from-pink-600 to-pink-800" },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500">{metric.label}</span>
                        <span className="text-zinc-300 font-medium">{metric.value}/100</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-700`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => copyToClipboard(filteredHooks[0]?.text)}
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Hook
                </Button>
                <Button variant="outline" size="sm">
                  Use in Script
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
