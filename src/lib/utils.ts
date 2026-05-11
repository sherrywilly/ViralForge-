import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function getViralScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

export function getViralScoreLabel(score: number): string {
  if (score >= 90) return "🔥 Viral";
  if (score >= 75) return "🚀 High";
  if (score >= 60) return "⚡ Good";
  if (score >= 40) return "📈 Average";
  return "📉 Low";
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export const NICHES = [
  { id: "motivation", label: "Motivation", emoji: "💪" },
  { id: "finance", label: "Finance", emoji: "💰" },
  { id: "fitness", label: "Fitness", emoji: "🏋️" },
  { id: "luxury", label: "Luxury", emoji: "💎" },
  { id: "business", label: "Business", emoji: "📈" },
  { id: "anime", label: "Anime", emoji: "⚔️" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "relationships", label: "Relationships", emoji: "❤️" },
  { id: "storytelling", label: "Storytelling", emoji: "📖" },
  { id: "ai_news", label: "AI News", emoji: "🤖" },
];

export const CONTENT_STYLES = [
  { id: "storytelling", label: "Storytelling" },
  { id: "educational", label: "Educational" },
  { id: "controversial", label: "Controversial" },
  { id: "motivational", label: "Motivational" },
  { id: "cinematic", label: "Cinematic" },
  { id: "meme", label: "Meme" },
  { id: "listicle", label: "Listicle" },
  { id: "documentary", label: "Documentary" },
];

export const PLATFORMS = [
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "instagram", label: "Instagram Reels", icon: "📸" },
  { id: "youtube", label: "YouTube Shorts", icon: "▶️" },
  { id: "twitter", label: "X / Twitter", icon: "𝕏" },
];

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Get started with AI video creation",
    features: [
      "5 videos per month",
      "Watermarked exports",
      "Basic script generation",
      "Standard voices",
      "720p export quality",
    ],
    limitations: ["No auto-posting", "No analytics", "No trend engine"],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    id: "creator",
    name: "Creator",
    price: 19,
    description: "For serious content creators",
    features: [
      "Unlimited scripts",
      "HD exports (1080p)",
      "Premium AI voices",
      "Viral hook engine",
      "Auto captions",
      "Basic analytics",
      "No watermark",
    ],
    limitations: [],
    cta: "Start Creating",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "For power users and growing brands",
    features: [
      "Everything in Creator",
      "Auto posting to all platforms",
      "Advanced trend engine",
      "Full analytics dashboard",
      "Clone viral videos",
      "Content calendar",
      "Priority rendering",
      "4K exports",
    ],
    limitations: [],
    cta: "Go Pro",
    highlighted: false,
  },
  {
    id: "agency",
    name: "Agency",
    price: 149,
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Client management",
      "White-label exports",
      "Approval workflows",
      "Dedicated support",
      "Custom integrations",
      "Unlimited team members",
    ],
    limitations: [],
    cta: "Scale Your Agency",
    highlighted: false,
  },
];
