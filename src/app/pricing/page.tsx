"use client";

import Link from "next/link";
import { CheckCircle2, X, Sparkles, ArrowLeft, Zap } from "lucide-react";
import { PRICING_PLANS } from "@/lib/utils";

const FEATURE_COMPARISON = [
  { feature: "Videos per month", free: "5", creator: "Unlimited", pro: "Unlimited", agency: "Unlimited" },
  { feature: "AI Script generation", free: "✓", creator: "✓", pro: "✓", agency: "✓" },
  { feature: "Hook engine", free: "Basic", creator: "Advanced", pro: "Advanced", agency: "Advanced" },
  { feature: "Video quality", free: "720p", creator: "1080p", pro: "4K", agency: "4K" },
  { feature: "Watermark", free: "Yes", creator: "No", pro: "No", agency: "No" },
  { feature: "AI Voiceover", free: "2 voices", creator: "8 voices", pro: "All voices", agency: "All voices" },
  { feature: "Auto captions", free: "✓", creator: "✓", pro: "✓", agency: "✓" },
  { feature: "Auto posting", free: "✗", creator: "✗", pro: "✓", agency: "✓" },
  { feature: "Trend engine", free: "✗", creator: "✗", pro: "✓", agency: "✓" },
  { feature: "Analytics dashboard", free: "Basic", creator: "Advanced", pro: "Full", agency: "Full" },
  { feature: "Team workspaces", free: "✗", creator: "✗", pro: "✗", agency: "✓" },
  { feature: "Client management", free: "✗", creator: "✗", pro: "✗", agency: "✓" },
  { feature: "White-label", free: "✗", creator: "✗", pro: "✗", agency: "✓" },
  { feature: "AI credits/month", free: "100", creator: "500", pro: "2000", agency: "10000" },
  { feature: "Support", free: "Community", creator: "Email", pro: "Priority", agency: "Dedicated" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] grid-pattern pb-24">
      <div className="absolute inset-0 gradient-bg" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Nav */}
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">ViralForge AI</span>
          </Link>
          <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
            Sign in
          </Link>
        </div>

        {/* Header */}
        <div className="text-center pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Simple Pricing</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Start free. Scale as you grow.
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            No hidden fees. Cancel anytime. 14-day money-back guarantee on paid plans.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 transition-all duration-200 ${
                plan.highlighted
                  ? "border-purple-500 bg-gradient-to-b from-purple-900/30 to-zinc-950 shadow-2xl shadow-purple-500/20 scale-105"
                  : "border-zinc-800 bg-[#111113] hover:border-zinc-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  🔥 Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-zinc-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-white">
                    {plan.price === 0 ? "Free" : `£${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-zinc-500 text-sm mb-2">/month</span>}
                </div>
                {plan.price > 0 && (
                  <p className="text-zinc-600 text-xs mt-1">Billed monthly · Cancel anytime</p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-purple-400" : "text-green-400"}`} />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-[#111113] rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Full feature comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-zinc-500 font-medium w-1/3">Feature</th>
                  {PRICING_PLANS.map((plan) => (
                    <th key={plan.id} className={`text-center p-4 font-bold ${plan.highlighted ? "text-purple-400" : "text-zinc-300"}`}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors ${i % 2 === 0 ? "bg-zinc-950/30" : ""}`}>
                    <td className="p-4 text-zinc-400">{row.feature}</td>
                    {[row.free, row.creator, row.pro, row.agency].map((val, j) => (
                      <td key={j} className="p-4 text-center">
                        {val === "✓" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                        ) : val === "✗" ? (
                          <X className="w-4 h-4 text-zinc-700 mx-auto" />
                        ) : (
                          <span className={`text-sm font-medium ${j === 2 ? "text-purple-400" : "text-zinc-300"}`}>
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel at any time?", a: "Yes, you can cancel your subscription at any time. No questions asked. Your access continues until the end of your billing period." },
              { q: "What AI models do you use?", a: "We use OpenAI GPT-4 for script generation, ElevenLabs for voiceovers, and proprietary models for viral scoring and trend detection." },
              { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, downgrades at the next billing cycle." },
              { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund." },
              { q: "What platforms can I auto-post to?", a: "Pro and Agency plans include auto-posting to TikTok, Instagram, YouTube Shorts, and X/Twitter." },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#111113] border border-zinc-800 rounded-xl p-5">
                <h3 className="font-semibold text-zinc-200 mb-2">{faq.q}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
