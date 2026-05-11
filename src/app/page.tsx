"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Video,
  Mic,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  Shield,
  Clock,
  Users,
  Globe,
} from "lucide-react";
import { PRICING_PLANS } from "@/lib/utils";

const ROTATING_WORDS = ["TikTok Videos", "Instagram Reels", "YouTube Shorts", "Viral Content", "AI Voiceovers"];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Script Generator",
    desc: "Generate viral-optimized scripts with powerful hooks, CTAs, and hashtags in seconds",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Zap,
    title: "Viral Hook Engine",
    desc: "Score and generate hooks with curiosity, retention, and emotional impact ratings",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: Video,
    title: "AI Video Generator",
    desc: "Automatically assemble short-form videos with B-roll, transitions, and effects",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Mic,
    title: "AI Voiceover System",
    desc: "Create realistic voiceovers with emotional tones and multilingual support via ElevenLabs",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: TrendingUp,
    title: "Trend Detection Engine",
    desc: "Discover viral trends on TikTok, Instagram, YouTube, and Twitter in real-time",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track views, retention curves, engagement rates, and viral scores across platforms",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

const STATS = [
  { value: "50K+", label: "Creators" },
  { value: "2.4M", label: "Videos Created" },
  { value: "8.2B", label: "Views Generated" },
  { value: "94%", label: "Satisfaction Rate" },
];

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    role: "TikTok Creator",
    followers: "1.2M",
    quote: "ViralForge AI helped me grow from 10K to 1.2M followers in 8 months. The hook engine is insane.",
    avatar: "🎯",
    stars: 5,
  },
  {
    name: "Sarah K.",
    role: "Finance Creator",
    followers: "847K",
    quote: "I create 30 videos a month that would have taken me 200 hours manually. Now it takes 10.",
    avatar: "💰",
    stars: 5,
  },
  {
    name: "Alex R.",
    role: "Agency Owner",
    followers: "15 clients",
    quote: "We manage 15 client accounts and ViralForge handles everything. Revenue up 340% in 6 months.",
    avatar: "🚀",
    stars: 5,
  },
];

export default function LandingPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setIsVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">ViralForge AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#features" className="text-zinc-400 hover:text-zinc-100 transition-colors">Features</Link>
            <Link href="#pricing" className="text-zinc-400 hover:text-zinc-100 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="text-zinc-400 hover:text-zinc-100 transition-colors">Reviews</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started Free
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 grid-pattern">
        <div className="absolute inset-0 gradient-bg" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-sm text-purple-300 font-medium">AI-Powered Viral Content Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Create Viral{" "}
            <span className={`gradient-text transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {ROTATING_WORDS[currentWordIndex]}
            </span>
            <br />
            Using AI in Minutes
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            ViralForge AI generates complete short-form videos — scripts, voiceovers, captions, B-roll — 
            and auto-posts them to TikTok, Instagram, and YouTube.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25 neon-glow"
            >
              <Sparkles className="w-5 h-5" />
              Start Creating for Free
            </Link>
            <button className="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-100 font-semibold px-8 py-4 rounded-xl text-lg hover:border-zinc-700 transition-colors">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> No credit card required</div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Setup in 2 minutes</div>
            <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 50K+ creators</div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-purple-500/10">
            <div className="bg-[#0c0c0e] flex min-h-[200px]">
              <div className="w-48 bg-[#0c0c0e] border-r border-zinc-800/50 p-3 hidden md:block">
                <div className="flex items-center gap-2 px-2 py-3 mb-4">
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-600 to-blue-600" />
                  <span className="text-sm font-bold gradient-text">ViralForge</span>
                </div>
                {["Dashboard", "Scripts", "Hooks", "Videos", "Analytics"].map((item) => (
                  <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs mb-1 ${item === "Dashboard" ? "bg-purple-500/15 text-purple-300" : "text-zinc-600"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item === "Dashboard" ? "bg-purple-500" : "bg-zinc-700"}`} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[["2.4M", "Views", "text-blue-400"], ["+4.8K", "Followers", "text-purple-400"], ["84", "Viral Score", "text-green-400"], ["47", "Credits", "text-yellow-400"]].map(([val, label, color]) => (
                    <div key={label} className="bg-[#111113] rounded-lg p-3 border border-zinc-800">
                      <div className={`text-sm font-bold mb-1 ${color}`}>{val}</div>
                      <div className="text-xs text-zinc-600">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#111113] rounded-lg p-3 border border-zinc-800 h-24 flex items-end gap-1 px-4">
                  {[40, 65, 50, 80, 95, 75, 100, 85, 70, 90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 6 ? "#a855f7" : "#27272a" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-purple-600/20 blur-3xl" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-zinc-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Everything you need to go viral</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">From script generation to auto-posting, ViralForge AI handles your entire content workflow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400 text-lg">Start free. Scale as you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.id} className={`relative rounded-2xl border p-6 transition-all duration-200 ${plan.highlighted ? "border-purple-500 bg-gradient-to-b from-purple-900/30 to-zinc-950 shadow-xl shadow-purple-500/20" : "border-zinc-800 bg-[#111113] hover:border-zinc-700"}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-zinc-500 text-xs mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price === 0 ? "Free" : `£${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-zinc-500 text-sm">/month</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${plan.highlighted ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Creators who went viral</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xl">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role} · {t.followers}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Ready to go viral?</h2>
          <p className="text-xl text-zinc-400 mb-10">Join 50,000+ creators who use ViralForge AI to create content that gets millions of views.</p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-10 py-5 rounded-2xl text-xl hover:opacity-90 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/30 neon-glow">
            <Sparkles className="w-6 h-6" />
            Start Creating for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold gradient-text">ViralForge AI</span>
            </div>
            <p className="text-zinc-600 text-sm">© 2025 ViralForge AI. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Globe className="w-4 h-4" />
              Built for creators worldwide
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
