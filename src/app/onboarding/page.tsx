"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NICHES, CONTENT_STYLES, PLATFORMS } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = [
  { id: 1, title: "Choose Your Niche", desc: "What type of content do you create?" },
  { id: 2, title: "Pick Your Style", desc: "How do you want your content to feel?" },
  { id: 3, title: "Select Platforms", desc: "Where do you post your content?" },
  { id: 4, title: "You're All Set! 🎉", desc: "Let's create your first viral video" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [completing, setCompleting] = useState(false);

  const handleComplete = async () => {
    setCompleting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Welcome to ViralForge AI! Let's go viral! 🚀");
    router.push("/dashboard");
  };

  const canProceed = () => {
    if (currentStep === 0) return selectedNiche !== null;
    if (currentStep === 1) return selectedStyles.length > 0;
    if (currentStep === 2) return selectedPlatforms.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#09090b] grid-pattern flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 gradient-bg" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">ViralForge AI</span>
          </div>
          <p className="text-zinc-500 text-sm">Let's personalize your experience</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < currentStep
                  ? "bg-purple-600 text-white"
                  : i === currentStep
                  ? "bg-purple-600 text-white ring-4 ring-purple-500/30"
                  : "bg-zinc-800 text-zinc-600"
              }`}>
                {i < currentStep ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-16 transition-all duration-300 ${i < currentStep ? "bg-purple-600" : "bg-zinc-800"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="glass-card p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{STEPS[currentStep].title}</h2>
            <p className="text-zinc-500">{STEPS[currentStep].desc}</p>
          </div>

          {/* Step 1: Choose Niche */}
          {currentStep === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {NICHES.map((niche) => (
                <button
                  key={niche.id}
                  onClick={() => setSelectedNiche(niche.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150 ${
                    selectedNiche === niche.id
                      ? "bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <span className="text-2xl">{niche.emoji}</span>
                  <span className={`text-xs font-medium ${selectedNiche === niche.id ? "text-purple-300" : "text-zinc-400"}`}>
                    {niche.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Content Style */}
          {currentStep === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CONTENT_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyles((prev) =>
                      prev.includes(style.id)
                        ? prev.filter((s) => s !== style.id)
                        : [...prev, style.id]
                    );
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150 ${
                    selectedStyles.includes(style.id)
                      ? "bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <span className={`text-sm font-medium ${selectedStyles.includes(style.id) ? "text-blue-300" : "text-zinc-400"}`}>
                    {style.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Platforms */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => {
                    setSelectedPlatforms((prev) =>
                      prev.includes(platform.id)
                        ? prev.filter((p) => p !== platform.id)
                        : [...prev, platform.id]
                    );
                  }}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-150 ${
                    selectedPlatforms.includes(platform.id)
                      ? "bg-green-500/15 border-green-500 shadow-lg shadow-green-500/10"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <span className="text-3xl">{platform.icon}</span>
                  <div className="text-left">
                    <div className={`font-semibold ${selectedPlatforms.includes(platform.id) ? "text-green-300" : "text-zinc-300"}`}>
                      {platform.label}
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <div className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Ready */}
          {currentStep === 3 && (
            <div className="text-center py-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 neon-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Your AI Studio is Ready!</h3>
              <p className="text-zinc-400 mb-6">
                You&apos;re set up for{" "}
                <span className="text-purple-400 font-semibold">
                  {NICHES.find((n) => n.id === selectedNiche)?.label}
                </span>{" "}
                content on{" "}
                <span className="text-blue-400 font-semibold">
                  {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""}
                </span>
                .
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "∞", label: "Scripts/month" },
                  { value: "5", label: "Free videos" },
                  { value: "10K+", label: "Hook templates" },
                ].map((item) => (
                  <div key={item.label} className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <div className="text-2xl font-black gradient-text">{item.value}</div>
                    <div className="text-xs text-zinc-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-zinc-800">
            {currentStep > 0 ? (
              <Button variant="ghost" onClick={() => setCurrentStep((p) => p - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}
            {currentStep < STEPS.length - 1 ? (
              <Button
                variant="gradient"
                onClick={() => setCurrentStep((p) => p + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="lg"
                onClick={handleComplete}
                loading={completing}
              >
                <Sparkles className="w-4 h-4" />
                Start Creating!
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
