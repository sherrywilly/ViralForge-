"use client";

import { useState } from "react";
import {
  Video,
  Play,
  Download,
  Sparkles,
  Settings2,
  Clock,
  Layers,
  Zap,
  Music,
  Type,
  Eye,
  CheckCircle2,
  Loader2,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Badge, ViralScoreBadge, Progress } from "@/components/ui/badge";
import { toast } from "sonner";

const VIDEO_STYLES = [
  { id: "cinematic", label: "Cinematic", emoji: "🎬", desc: "Movie-quality cuts and transitions" },
  { id: "tiktok", label: "TikTok Edit", emoji: "📱", desc: "Fast-paced, attention-grabbing" },
  { id: "reels", label: "Reels Style", emoji: "📸", desc: "Instagram-optimized format" },
  { id: "faceless", label: "Faceless Story", emoji: "🎭", desc: "AI visuals, no face needed" },
  { id: "reddit", label: "Reddit Story", emoji: "💬", desc: "Story-based with text overlays" },
  { id: "documentary", label: "Documentary", emoji: "📽️", desc: "Serious, educational tone" },
  { id: "luxury", label: "Luxury Edit", emoji: "💎", desc: "High-end, premium aesthetic" },
  { id: "dark", label: "Dark Edit", emoji: "🌑", desc: "Dramatic, dark aesthetic" },
];

const CAPTION_STYLES = [
  { id: "hormozi", label: "Alex Hormozi", desc: "Bold, impactful captions" },
  { id: "gadzhi", label: "Iman Gadzhi", desc: "Premium lifestyle style" },
  { id: "cinematic", label: "Cinematic", desc: "Movie-style subtitles" },
  { id: "meme", label: "Meme Style", desc: "Fun, casual captions" },
  { id: "dynamic", label: "Dynamic", desc: "Animated, colorful" },
];

const GENERATION_STEPS = [
  { id: "script", label: "Processing Script", icon: "📝" },
  { id: "visuals", label: "Selecting Visuals", icon: "🖼️" },
  { id: "voiceover", label: "Generating Voiceover", icon: "🎤" },
  { id: "captions", label: "Adding Captions", icon: "💬" },
  { id: "transitions", label: "Applying Transitions", icon: "✨" },
  { id: "rendering", label: "Rendering Video", icon: "🎬" },
  { id: "complete", label: "Video Ready!", icon: "✅" },
];

const SAMPLE_VIDEOS = [
  {
    id: "v1",
    title: "7 Habits That Changed My Life",
    style: "Cinematic",
    platform: "TikTok",
    duration: "58s",
    thumbnail: "🎯",
    views: "142K",
    viralScore: 87,
    status: "published",
  },
  {
    id: "v2",
    title: "Nobody Tells You This About Money",
    style: "TikTok Edit",
    platform: "Instagram",
    duration: "32s",
    thumbnail: "💰",
    views: "89K",
    viralScore: 79,
    status: "published",
  },
  {
    id: "v3",
    title: "The Dark Side of Social Media",
    style: "Dark Edit",
    platform: "YouTube",
    duration: "45s",
    thumbnail: "📱",
    views: "-",
    viralScore: 92,
    status: "generating",
  },
];

export default function VideoGeneratorPage() {
  const [activeTab, setActiveTab] = useState<"create" | "library">("create");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [selectedCaptionStyle, setSelectedCaptionStyle] = useState("hormozi");
  const [generating, setGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState({
    script: "",
    platform: "tiktok",
    voice: "female_energetic",
    bgMusic: "trending_upbeat",
    aspectRatio: "9:16",
    quality: "1080p",
  });

  const simulateGeneration = async () => {
    if (!formData.script) {
      toast.error("Please enter a script or select one from your saved scripts");
      return;
    }

    setGenerating(true);
    setCurrentStep(0);

    for (let i = 0; i < GENERATION_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 1500));
      setCurrentStep(i);
    }

    setTimeout(() => {
      setGenerating(false);
      setCurrentStep(-1);
      toast.success("Video generated successfully! 🎬");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-blue-500/15 rounded-lg">
              <Video className="w-5 h-5 text-blue-400" />
            </div>
            AI Video Generator
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Create viral-ready short-form videos with AI automation
          </p>
        </div>
        <div className="flex gap-2">
          {(["create", "library"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {tab === "create" ? "Create New" : "My Videos"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "create" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config Panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* Script Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-purple-400" />
                  Script
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Paste your script here, or generate one from the Script Generator..."
                  value={formData.script}
                  onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                  className="h-32"
                />
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Import from Scripts
                  </Button>
                  <Button variant="ghost" size="sm">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Style */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Video Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {VIDEO_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl text-left border transition-all duration-150 ${
                        selectedStyle === style.id
                          ? "bg-blue-500/15 border-blue-500/40"
                          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.emoji}</div>
                      <div className={`text-xs font-semibold mb-0.5 ${selectedStyle === style.id ? "text-blue-300" : "text-zinc-300"}`}>
                        {style.label}
                      </div>
                      <div className="text-xs text-zinc-600 leading-tight">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Caption Style */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-green-400" />
                  Caption Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {CAPTION_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedCaptionStyle(style.id)}
                      className={`p-3 rounded-lg text-left border transition-all duration-150 ${
                        selectedCaptionStyle === style.id
                          ? "bg-green-500/15 border-green-500/40"
                          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className={`text-xs font-semibold mb-0.5 ${selectedCaptionStyle === style.id ? "text-green-300" : "text-zinc-300"}`}>
                        {style.label}
                      </div>
                      <div className="text-xs text-zinc-600">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-zinc-400" />
                  Video Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Select
                    label="Platform"
                    options={[
                      { value: "tiktok", label: "TikTok (9:16)" },
                      { value: "instagram", label: "Instagram Reels" },
                      { value: "youtube", label: "YouTube Shorts" },
                    ]}
                    value={formData.platform}
                    onChange={(v) => setFormData({ ...formData, platform: v })}
                  />
                  <Select
                    label="Quality"
                    options={[
                      { value: "720p", label: "720p HD" },
                      { value: "1080p", label: "1080p Full HD" },
                      { value: "4k", label: "4K (Pro)" },
                    ]}
                    value={formData.quality}
                    onChange={(v) => setFormData({ ...formData, quality: v })}
                  />
                  <Select
                    label="Background Music"
                    options={[
                      { value: "trending_upbeat", label: "Trending Upbeat" },
                      { value: "cinematic", label: "Cinematic" },
                      { value: "none", label: "No Music" },
                      { value: "dark_ambient", label: "Dark Ambient" },
                    ]}
                    value={formData.bgMusic}
                    onChange={(v) => setFormData({ ...formData, bgMusic: v })}
                  />
                </div>

                {/* Feature Toggles */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { label: "Auto B-Roll", desc: "Relevant stock footage", icon: "🎥" },
                    { label: "Auto Zoom", desc: "Dynamic zoom effects", icon: "🔍" },
                    { label: "Beat Sync", desc: "Sync cuts to music", icon: "🎵" },
                    { label: "Auto Transitions", desc: "Smooth scene changes", icon: "✨" },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <span className="text-xl">{feature.icon}</span>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-zinc-300">{feature.label}</div>
                        <div className="text-xs text-zinc-600">{feature.desc}</div>
                      </div>
                      <div className="w-8 h-4 bg-purple-600 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Generate Panel */}
          <div className="space-y-4">
            {/* Phone Preview */}
            <Card className="p-4">
              <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-zinc-500" />
                Preview
              </h3>
              <div className="relative mx-auto" style={{ maxWidth: "180px" }}>
                {/* Phone frame */}
                <div className="relative bg-zinc-900 rounded-3xl border-4 border-zinc-700 overflow-hidden" style={{ aspectRatio: "9/16" }}>
                  {generating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                      <p className="text-xs text-zinc-400 text-center">
                        {GENERATION_STEPS[currentStep]?.label}
                      </p>
                      <div className="w-full">
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-1000"
                            style={{ width: `${((currentStep + 1) / GENERATION_STEPS.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="text-4xl mb-3">🎬</div>
                      <p className="text-xs text-zinc-500">Your video preview will appear here</p>
                      {/* Mock UI overlay */}
                      <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                        <div className="w-6 h-6 bg-zinc-700/80 rounded-full flex items-center justify-center">
                          <Heart className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Generation Progress */}
            {generating && (
              <Card className="p-4">
                <h3 className="text-sm font-medium text-zinc-300 mb-3">Generation Progress</h3>
                <div className="space-y-2">
                  {GENERATION_STEPS.map((step, i) => (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                        i === currentStep
                          ? "bg-purple-500/15 border border-purple-500/25"
                          : i < currentStep
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <span className="text-sm">{step.icon}</span>
                      <span className="text-xs text-zinc-400 flex-1">{step.label}</span>
                      {i < currentStep && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      )}
                      {i === currentStep && (
                        <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Settings Summary */}
            <Card className="p-4">
              <h3 className="text-sm font-medium text-zinc-300 mb-3">Configuration</h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Style", value: VIDEO_STYLES.find(s => s.id === selectedStyle)?.label || "" },
                  { label: "Captions", value: CAPTION_STYLES.find(s => s.id === selectedCaptionStyle)?.label || "" },
                  { label: "Quality", value: formData.quality },
                  { label: "Auto B-Roll", value: "Enabled" },
                  { label: "Beat Sync", value: "Enabled" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-zinc-600">{item.label}</span>
                    <span className="text-zinc-300 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Zap className="w-3 h-3" />
                  Credits: 3
                </div>
                <Badge variant="purple" size="sm">1 credit used</Badge>
              </div>
            </Card>

            {/* Generate Button */}
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={simulateGeneration}
              loading={generating}
            >
              <Video className="w-4 h-4" />
              {generating ? "Generating Video..." : "Generate Video"}
            </Button>
          </div>
        </div>
      )}

      {activeTab === "library" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_VIDEOS.map((video) => (
              <div key={video.id} className="video-card">
                {/* Thumbnail */}
                <div
                  className="relative bg-zinc-800 flex items-center justify-center"
                  style={{ aspectRatio: "9/16", maxHeight: "280px" }}
                >
                  <span className="text-6xl">{video.thumbnail}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-semibold text-white leading-tight">{video.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="ghost" size="sm">{video.duration}</Badge>
                      {video.views !== "-" && (
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  {video.status === "generating" && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="yellow" size="sm">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        Generating
                      </Badge>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      <Badge variant="ghost" size="sm">{video.style}</Badge>
                      <Badge variant="ghost" size="sm">{video.platform}</Badge>
                    </div>
                    <ViralScoreBadge score={video.viralScore} size="sm" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">
                      <Play className="w-3.5 h-3.5" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* New Video Card */}
            <button
              onClick={() => setActiveTab("create")}
              className="video-card flex flex-col items-center justify-center gap-3 p-6 border-dashed border-2 border-zinc-800 hover:border-purple-500/40 transition-all"
              style={{ minHeight: "300px" }}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-zinc-300">Create New Video</div>
                <div className="text-xs text-zinc-600 mt-1">Generate with AI</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
