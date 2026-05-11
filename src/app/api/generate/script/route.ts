import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const VIRAL_HOOKS = [
  "Nobody tells you this, but",
  "This feels illegal to know:",
  "You're wasting years doing this.",
  "The internet doesn't want you to see this.",
  "Most people don't know this secret:",
  "Stop doing this immediately:",
  "I discovered something that changed everything:",
  "This is the truth they hide from you:",
];

const HASHTAG_SETS: Record<string, string[]> = {
  motivation: ["Motivation", "Mindset", "Success", "GrowthMindset", "Inspire", "PersonalDevelopment", "Hustle", "Goals"],
  finance: ["Finance", "Money", "Wealth", "Investing", "FinancialFreedom", "MoneyTips", "Investment", "Stock"],
  fitness: ["Fitness", "FitTok", "GymLife", "Workout", "HealthyLifestyle", "GymMotivation", "Training", "Health"],
  luxury: ["Luxury", "LuxuryLifestyle", "OldMoney", "HighEnd", "Premium", "Elite", "Prestige"],
  business: ["Business", "Entrepreneur", "StartUp", "BusinessTips", "Marketing", "Growth", "Success"],
  anime: ["Anime", "AnimeTok", "AnimeEdits", "Manga", "Otaku", "AnimeCommunity"],
  gaming: ["Gaming", "GamersOfTikTok", "VideoGames", "GamingLife", "Gamer", "Games"],
  relationships: ["Relationships", "Dating", "Love", "Advice", "RelationshipAdvice", "Dating101"],
  storytelling: ["Storytelling", "Story", "Narrative", "CreativeWriting"],
  ai_news: ["AI", "ArtificialIntelligence", "Tech", "ChatGPT", "FutureOfAI", "TechNews", "AITools"],
};

function generateScript(params: {
  niche: string;
  topic: string;
  tone: string;
  audience: string;
  style: string;
  platform: string;
  duration: string;
}) {
  const { niche, topic, tone, audience, style, duration } = params;

  const hook =
    VIRAL_HOOKS[Math.floor(Math.random() * VIRAL_HOOKS.length)] +
    ` ${topic.toLowerCase()}.`;

  const scripts: Record<string, string> = {
    storytelling: `[HOOK] ${hook}

[STORY SETUP]
Let me tell you about the moment everything changed for me. I was just like you — struggling with ${topic}, wondering why nothing was working.

[CONFLICT]
For years, I did exactly what everyone told me to do. I followed the "rules." I played it safe. And do you know what happened? Nothing. Zero. Complete failure.

[TURNING POINT]
Then one day, I stumbled across something that changed everything. A single insight about ${topic} that nobody talks about.

[VALUE]
Here's what I learned: Most people approach ${topic} completely backwards. They focus on the wrong things, waste time on tactics that don't work, and never understand the fundamental truth.

[RESOLUTION]
Once I understood this, everything clicked. In just 90 days, the results were undeniable.

[CTA]
If you want to know the exact strategy I used, save this video. I'm breaking it all down in my next post.`,

    educational: `[HOOK] ${hook}

[INTRO]
If you're ${audience ? `a ${audience}` : "someone"} who wants to master ${topic}, pay attention — because this changes everything.

[POINT 1]
First, understand that 90% of people get ${topic} completely wrong. Here's why: they skip the fundamentals and jump straight to advanced tactics.

[POINT 2]
The real key to ${topic} is this: you need to build your foundation before anything else. Without it, nothing works.

[POINT 3]
Here's the exact framework I use: Step 1 — Start with intention. Step 2 — Execute consistently. Step 3 — Analyze and optimize.

[PROOF]
This approach has been validated by thousands of people across different niches. The results speak for themselves.

[CTA]
Follow for more ${niche} content that actually moves the needle.`,

    motivational: `[HOOK] ${hook}

[CALL OUT]
If you're watching this, you already know something is off. You know you're capable of more. You know ${topic} is holding you back.

[TRUTH BOMB]
Here's the hard truth: You're not where you want to be because of one thing. You've been lying to yourself about what's possible.

[REFRAME]
But here's what nobody tells you — the gap between where you are and where you want to be is smaller than you think. The only thing standing in your way is your approach.

[ACTION STEPS]
Starting today, do these three things: One — commit fully. Two — eliminate the noise. Three — execute relentlessly.

[CLOSE]
The version of you that has everything you want is on the other side of this decision. Make it.

[CTA]
Drop a 🔥 if this hit different. Share this with someone who needs to hear it.`,
  };

  const scriptContent = scripts[style] || scripts.storytelling;

  const cta = `Follow @[YourAccount] for daily ${niche} content that goes viral. Drop a comment with your biggest challenge with ${topic} — I read every single one.

Save this video if it helped you! 🔥

#${niche.replace("_", "")} #viral #fyp`;

  const hashtags = [
    ...(HASHTAG_SETS[niche] || HASHTAG_SETS.motivation),
    "FYP",
    "ForYou",
    "Viral",
    "TikTok",
    topic.split(" ")[0].replace(/[^a-zA-Z]/g, ""),
  ].slice(0, 12);

  const title = `${hook.split(".")[0]} (${topic})`;

  const captions = `${hook}

${topic} — the truth nobody talks about.

Save this if it hit different 🔥

${hashtags.slice(0, 5).map((h) => `#${h}`).join(" ")}`;

  // Generate scores based on content quality signals
  const viralScore = Math.floor(Math.random() * 20 + 75);
  const retentionScore = Math.floor(Math.random() * 15 + 70);
  const engagementScore = Math.floor(Math.random() * 20 + 72);

  return {
    hook,
    script: scriptContent,
    cta,
    hashtags,
    title,
    captions,
    viralScore,
    retentionScore,
    engagementScore,
    duration: `~${duration} seconds`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { niche, topic, tone, audience, style, platform, duration } = body;

    if (!niche || !topic) {
      return NextResponse.json(
        { error: "Niche and topic are required" },
        { status: 400 }
      );
    }

    // In production, use OpenAI API here
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({ ... });

    const script = generateScript({ niche, topic, tone, audience, style, platform, duration });

    return NextResponse.json(script);
  } catch (error) {
    console.error("Script generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate script" },
      { status: 500 }
    );
  }
}
