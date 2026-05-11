export type UserRole = "user" | "admin" | "creator_pro" | "team";
export type SubscriptionPlan = "free" | "creator" | "pro" | "agency";
export type VideoStatus = "pending" | "generating" | "completed" | "failed";
export type Platform = "tiktok" | "instagram" | "youtube" | "twitter";
export type ContentStyle =
  | "storytelling"
  | "educational"
  | "controversial"
  | "motivational"
  | "cinematic"
  | "meme"
  | "listicle"
  | "documentary";

export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  role: UserRole;
  plan: SubscriptionPlan;
  credits: number;
  niche?: string;
  platforms: Platform[];
  createdAt: Date;
}

export interface Script {
  id: string;
  userId: string;
  niche: string;
  topic: string;
  tone: string;
  audience: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  title: string;
  captions: string;
  style: ContentStyle;
  viralScore: number;
  createdAt: Date;
}

export interface Hook {
  id: string;
  text: string;
  curiosityScore: number;
  retentionScore: number;
  emotionalImpactScore: number;
  overallScore: number;
  category: string;
}

export interface Video {
  id: string;
  userId: string;
  title: string;
  script?: Script;
  status: VideoStatus;
  platform: Platform;
  style: string;
  duration?: number;
  thumbnail?: string;
  url?: string;
  views?: number;
  likes?: number;
  shares?: number;
  viralScore?: number;
  createdAt: Date;
  publishedAt?: Date;
}

export interface Voiceover {
  id: string;
  scriptId: string;
  voiceId: string;
  voiceName: string;
  gender: "male" | "female";
  tone: string;
  language: string;
  url?: string;
  duration?: number;
  createdAt: Date;
}

export interface Trend {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  trendScore: number;
  competitionLevel: "low" | "medium" | "high";
  viralPotential: number;
  hashtags: string[];
  relatedNiches: string[];
  growth: number;
  createdAt: Date;
}

export interface AnalyticsData {
  views: number;
  watchTime: number;
  engagement: number;
  retention: number;
  ctr: number;
  followersGained: number;
  topHooks: string[];
  bestTimes: string[];
}

export interface ContentCalendarItem {
  id: string;
  date: Date;
  title: string;
  platform: Platform;
  status: "draft" | "scheduled" | "published";
  videoId?: string;
  time?: string;
}

export interface GenerateScriptParams {
  niche: string;
  topic: string;
  tone: string;
  audience: string;
  style: ContentStyle;
  platform: Platform;
  duration?: number;
}

export interface GenerateHooksParams {
  niche: string;
  topic: string;
  count?: number;
}

export interface GenerateVoiceoverParams {
  text: string;
  voiceId: string;
  stability?: number;
  similarity?: number;
  style?: number;
}

export interface DashboardStats {
  totalVideos: number;
  totalViews: number;
  totalEngagement: number;
  creditsRemaining: number;
  scheduledPosts: number;
  trending: number;
}
