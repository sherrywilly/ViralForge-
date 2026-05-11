import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const HOOK_TEMPLATES = [
  {
    template: "Nobody tells {audience} this, but {topic} could {outcome}.",
    category: "Curiosity",
    curiosity: 94,
    retention: 89,
    emotional: 87,
  },
  {
    template: "This feels illegal to know: {topic} is actually {truth}.",
    category: "Secret",
    curiosity: 98,
    retention: 91,
    emotional: 85,
  },
  {
    template: "You're wasting years doing this. Stop {action} immediately.",
    category: "Warning",
    curiosity: 88,
    retention: 85,
    emotional: 94,
  },
  {
    template: "The internet doesn't want you to know this {topic} secret.",
    category: "Forbidden",
    curiosity: 96,
    retention: 88,
    emotional: 90,
  },
  {
    template: "I went from {failure} to {success} by changing ONE thing about {topic}.",
    category: "Story",
    curiosity: 85,
    retention: 92,
    emotional: 88,
  },
  {
    template: "Most people will scroll past this. The ones who stop will {benefit}.",
    category: "Challenge",
    curiosity: 90,
    retention: 94,
    emotional: 85,
  },
  {
    template: "{Number} things about {topic} that will change how you think forever.",
    category: "Listicle",
    curiosity: 82,
    retention: 88,
    emotional: 79,
  },
  {
    template: "If you're {audience}, you're doing {topic} completely wrong. Here's the truth.",
    category: "Controversy",
    curiosity: 91,
    retention: 87,
    emotional: 93,
  },
  {
    template: "I can't believe nobody talks about this {topic} hack.",
    category: "Shock",
    curiosity: 93,
    retention: 86,
    emotional: 88,
  },
  {
    template: "The {topic} advice they give you is a lie. Here's what actually works.",
    category: "Expose",
    curiosity: 95,
    retention: 89,
    emotional: 91,
  },
];

function generateHooks(niche: string, topic: string, count: number) {
  const hooks = [];
  const usedTemplates = new Set<number>();

  const nicheKeywords: Record<string, { audiences: string[]; outcomes: string[]; truths: string[] }> = {
    motivation: {
      audiences: ["men", "young people", "creators", "dreamers", "entrepreneurs"],
      outcomes: ["change your entire life", "unlock your potential", "transform your mindset"],
      truths: ["about consistency and discipline", "not about motivation", "all about systems"],
    },
    finance: {
      audiences: ["average people", "employees", "investors", "millennials"],
      outcomes: ["build generational wealth", "escape the rat race", "retire early"],
      truths: ["about compound interest", "about passive income", "backwards"],
    },
    fitness: {
      audiences: ["gym beginners", "people over 30", "women", "busy people"],
      outcomes: ["transform your body in 90 days", "lose 20 pounds naturally", "build real muscle"],
      truths: ["about metabolism", "about rest days", "not what influencers say"],
    },
    business: {
      audiences: ["entrepreneurs", "freelancers", "solopreneurs", "founders"],
      outcomes: ["scale past 6 figures", "land your first client", "build recurring revenue"],
      truths: ["about customer acquisition", "about scaling", "the opposite of conventional wisdom"],
    },
  };

  const keywords = nicheKeywords[niche] || nicheKeywords.motivation;

  for (let i = 0; i < count; i++) {
    let templateIndex;
    do {
      templateIndex = Math.floor(Math.random() * HOOK_TEMPLATES.length);
    } while (usedTemplates.has(templateIndex) && usedTemplates.size < HOOK_TEMPLATES.length);

    usedTemplates.add(templateIndex);
    const template = HOOK_TEMPLATES[templateIndex];

    const audience = keywords.audiences[Math.floor(Math.random() * keywords.audiences.length)];
    const outcome = keywords.outcomes[Math.floor(Math.random() * keywords.outcomes.length)];
    const truth = keywords.truths[Math.floor(Math.random() * keywords.truths.length)];

    const text = template.template
      .replace("{audience}", audience)
      .replace("{topic}", topic)
      .replace("{outcome}", outcome)
      .replace("{truth}", truth)
      .replace("{action}", `treating ${topic} the same way`)
      .replace("{failure}", "zero")
      .replace("{success}", "5 figures")
      .replace("{benefit}", `understand ${topic} differently`)
      .replace("{Number}", String(Math.floor(Math.random() * 7 + 3)));

    // Add small variance to scores
    const variance = () => Math.floor(Math.random() * 10 - 5);

    const curiosity = Math.min(99, Math.max(60, template.curiosity + variance()));
    const retention = Math.min(99, Math.max(60, template.retention + variance()));
    const emotional = Math.min(99, Math.max(60, template.emotional + variance()));

    hooks.push({
      id: `hook_${i}_${Date.now()}`,
      text,
      curiosityScore: curiosity,
      retentionScore: retention,
      emotionalImpactScore: emotional,
      overallScore: Math.round((curiosity + retention + emotional) / 3),
      category: template.category,
      platform: ["TikTok", "Instagram", "YouTube"][i % 3],
    });
  }

  return hooks.sort((a, b) => b.overallScore - a.overallScore);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { niche, topic, count = 6 } = body;

    if (!niche || !topic) {
      return NextResponse.json(
        { error: "Niche and topic are required" },
        { status: 400 }
      );
    }

    // In production, use OpenAI API here
    const hooks = generateHooks(niche, topic, Math.min(count, 15));

    return NextResponse.json({ hooks });
  } catch (error) {
    console.error("Hook generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate hooks" },
      { status: 500 }
    );
  }
}
