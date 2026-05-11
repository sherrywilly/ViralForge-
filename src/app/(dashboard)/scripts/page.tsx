"use client";

import { useState } from "react";
import { Sparkles, Copy, Download, RefreshCw, Zap, Hash, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Badge, ViralScoreBadge } from "@/components/ui/badge";
import { NICHES, CONTENT_STYLES, PLATFORMS } from "@/lib/utils";
import { toast } from "sonner";

interface GeneratedScript {
  hook: string;
  script: string;
  cta: string;
  hashtags: string[];
  title: string;
  captions: string;
  viralScore: number;
  retentionScore: number;
  engagementScore: number;
  duration: string;
}

export default function ScriptGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    niche: "",
    topic: "",
    tone: "energetic",
    audience: "",
    style: "storytelling",
    platform: "tiktok",
    duration: "60",
  });
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hook");

  const handleGenerate = async () => {
    if (!formData.niche || !formData.topic) {
      toast.error("Please fill in niche and topic");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate script");

      const data = await response.json();
      setGeneratedScript(data);
      setActiveSection("hook");
      toast.success("Script generated successfully! 🎉");
    } catch {
      toast.error("Failed to generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const toneOptions = [
    { value: "energetic", label: "⚡ Energetic" },
    { value: "calm", label: "🌊 Calm & Thoughtful" },
    { value: "dramatic", label: "🎭 Dramatic" },
    { value: "humorous", label: "😄 Humorous" },
    { value: "authoritative", label: "💪 Authoritative" },
    { value: "mysterious", label: "🔮 Mysterious" },
    { value: "inspirational", label: "✨ Inspirational" },
  ];

  const durationOptions = [
    { value: "15", label: "15 seconds" },
    { value: "30", label: "30 seconds" },
    { value: "60", label: "60 seconds" },
    { value: "90", label: "90 seconds" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-purple-500/15 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          AI Script Generator
        </h1>
        <p className="text-zinc-500 mt-1 text-sm">
          Generate viral-optimized scripts with AI-powered hooks, CTAs, and hashtags
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Script Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Content Niche"
                placeholder="Select your niche..."
                options={NICHES.map((n) => ({
                  value: n.id,
                  label: `${n.emoji} ${n.label}`,
                }))}
                value={formData.niche}
                onChange={(v) => setFormData({ ...formData, niche: v })}
              />

              <Input
                label="Topic / Angle"
                placeholder="e.g. The dark side of social media"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />

              <Input
                label="Target Audience"
                placeholder="e.g. 18-35 year old entrepreneurs"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Tone"
                  options={toneOptions}
                  value={formData.tone}
                  onChange={(v) => setFormData({ ...formData, tone: v })}
                />
                <Select
                  label="Duration"
                  options={durationOptions}
                  value={formData.duration}
                  onChange={(v) => setFormData({ ...formData, duration: v })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Content Style"
                  options={CONTENT_STYLES.map((s) => ({
                    value: s.id,
                    label: s.label,
                  }))}
                  value={formData.style}
                  onChange={(v) => setFormData({ ...formData, style: v })}
                />
                <Select
                  label="Platform"
                  options={PLATFORMS.map((p) => ({
                    value: p.id,
                    label: `${p.icon} ${p.label}`,
                  }))}
                  value={formData.platform}
                  onChange={(v) => setFormData({ ...formData, platform: v })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Style Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Script Style</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, style: style.id })}
                    className={`p-3 rounded-lg text-sm font-medium border transition-all duration-150 text-left ${
                      formData.style === style.id
                        ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            loading={loading}
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating Script..." : "Generate Viral Script"}
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          {!generatedScript && !loading && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 float">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-zinc-300 font-semibold mb-2">Ready to Generate</h3>
                <p className="text-zinc-600 text-sm max-w-xs">
                  Fill in your niche and topic, then click generate to create your viral script
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                </div>
                <h3 className="text-zinc-300 font-semibold mb-2">Generating Your Script...</h3>
                <p className="text-zinc-600 text-sm">AI is crafting your viral content</p>
                <div className="mt-4 space-y-2 text-xs text-zinc-600 text-left max-w-xs mx-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    Analyzing trending hooks...
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Optimizing for retention...
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Crafting viral structure...
                  </div>
                </div>
              </div>
            </div>
          )}

          {generatedScript && (
            <>
              {/* Score Banner */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-zinc-200">Viral Analysis</h3>
                  <ViralScoreBadge score={generatedScript.viralScore} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Viral Score", value: generatedScript.viralScore, color: "from-purple-600 to-purple-800" },
                    { label: "Retention", value: generatedScript.retentionScore, color: "from-blue-600 to-blue-800" },
                    { label: "Engagement", value: generatedScript.engagementScore, color: "from-green-600 to-green-800" },
                  ].map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-1">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="#27272a" strokeWidth="4" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="url(#grad)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${(metric.value / 100) * 175.9} 175.9`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{metric.value}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Script Sections */}
              {[
                { key: "hook", label: "🎯 Hook", content: generatedScript.hook, tip: "Opens with a powerful attention grabber" },
                { key: "script", label: "📜 Full Script", content: generatedScript.script, tip: "Complete script with storytelling" },
                { key: "cta", label: "📣 Call to Action", content: generatedScript.cta, tip: "Engagement-driving conclusion" },
                { key: "captions", label: "💬 Captions", content: generatedScript.captions, tip: "Platform-optimized captions" },
              ].map((section) => (
                <Card key={section.key}>
                  <button
                    className="w-full p-4 flex items-center justify-between text-left"
                    onClick={() => setActiveSection(activeSection === section.key ? "" : section.key)}
                  >
                    <div>
                      <div className="font-medium text-zinc-200">{section.label}</div>
                      <div className="text-xs text-zinc-600">{section.tip}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(section.content, section.label);
                        }}
                        className="p-1.5 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-600 transition-transform ${
                          activeSection === section.key ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {activeSection === section.key && (
                    <div className="px-4 pb-4">
                      <div className="bg-zinc-900 rounded-lg p-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap border border-zinc-800">
                        {section.content}
                      </div>
                    </div>
                  )}
                </Card>
              ))}

              {/* Hashtags */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-zinc-200 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-blue-400" />
                    Hashtags ({generatedScript.hashtags.length})
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedScript.hashtags.join(" "), "Hashtags")}
                    className="p-1.5 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generatedScript.hashtags.map((tag, i) => (
                    <Badge key={i} variant="blue">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="gradient" size="md" className="flex-1">
                  <Zap className="w-4 h-4" />
                  Generate Video
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleGenerate}
                  loading={loading}
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => copyToClipboard(
                    `${generatedScript.hook}\n\n${generatedScript.script}\n\n${generatedScript.cta}`,
                    "Full script"
                  )}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
