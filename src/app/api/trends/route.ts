import { NextResponse } from "next/server";

const TRENDS = [
  {
    id: "1",
    title: "AI replacing jobs in 2025",
    platform: "TikTok",
    trendScore: 96,
    competitionLevel: "medium",
    viralPotential: 92,
    hashtags: ["AI", "Jobs", "Future", "Automation"],
    growth: 340,
  },
  {
    id: "2",
    title: "Silent walking trend",
    platform: "Instagram",
    trendScore: 88,
    competitionLevel: "low",
    viralPotential: 85,
    hashtags: ["SilentWalking", "Wellness", "Mindfulness"],
    growth: 220,
  },
  {
    id: "3",
    title: "Dark psychology techniques",
    platform: "TikTok",
    trendScore: 94,
    competitionLevel: "medium",
    viralPotential: 89,
    hashtags: ["Psychology", "DarkPsychology", "Mindset"],
    growth: 290,
  },
];

export async function GET() {
  // In production, fetch from TikTok API, YouTube Data API, etc.
  return NextResponse.json({
    trends: TRENDS,
    lastUpdated: new Date().toISOString(),
    totalTrends: TRENDS.length,
  });
}
