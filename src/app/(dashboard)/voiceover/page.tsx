"use client";

import { useState } from "react";
import { Mic, Play, Download, Sparkles, Volume2, Pause, RefreshCw, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea, Select } from "@/components/ui/input";
import { Badge, Progress } from "@/components/ui/badge";
import { toast } from "sonner";

const VOICES = [
  { id: "rachel", name: "Rachel", gender: "female", tone: "energetic", language: "English", premium: false, sample: "Perfect for motivational content" },
  { id: "adam", name: "Adam", gender: "male", tone: "authoritative", language: "English", premium: false, sample: "Great for educational content" },
  { id: "bella", name: "Bella", gender: "female", tone: "dramatic", language: "English", premium: true, sample: "Storytelling and drama" },
  { id: "marcus", name: "Marcus", gender: "male", tone: "calm", language: "English", premium: true, sample: "Documentary style" },
  { id: "zara", name: "Zara", gender: "female", tone: "mysterious", language: "English", premium: true, sample: "Dark, atmospheric content" },
  { id: "jake", name: "Jake", gender: "male", tone: "humorous", language: "English", premium: false, sample: "Fun, casual content" },
];

const LANGUAGES = [
  { value: "en", label: "🇺🇸 English" },
  { value: "es", label: "🇪🇸 Spanish" },
  { value: "fr", label: "🇫🇷 French" },
  { value: "de", label: "🇩🇪 German" },
  { value: "pt", label: "🇧🇷 Portuguese" },
  { value: "hi", label: "🇮🇳 Hindi" },
  { value: "ja", label: "🇯🇵 Japanese" },
  { value: "ar", label: "🇸🇦 Arabic" },
];

const VOICE_MODES = [
  { id: "standard", label: "Standard", desc: "Natural, clear voiceover" },
  { id: "dramatic", label: "Dramatic Mode", desc: "Intense, emotional delivery" },
  { id: "storytelling", label: "Storytelling", desc: "Engaging narrative pacing" },
  { id: "documentary", label: "Documentary", desc: "Professional, informative" },
];

export default function VoiceoverPage() {
  const [selectedVoice, setSelectedVoice] = useState("rachel");
  const [selectedMode, setSelectedMode] = useState("standard");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stability, setStability] = useState(75);
  const [similarity, setSimilarity] = useState(75);
  const [styleIntensity, setStyleIntensity] = useState(50);

  const handleGenerate = async () => {
    if (!text) {
      toast.error("Please enter some text to convert to speech");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate/voiceover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voiceId: selectedVoice,
          stability: stability / 100,
          similarity: similarity / 100,
          style: styleIntensity / 100,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate voiceover");

      setGenerated(true);
      toast.success("Voiceover generated successfully! 🎤");
    } catch {
      toast.error("Failed to generate voiceover. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const estimatedDuration = Math.ceil(wordCount / 2.5); // ~2.5 words per second

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-pink-500/15 rounded-lg">
            <Mic className="w-5 h-5 text-pink-400" />
          </div>
          AI Voiceover System
        </h1>
        <p className="text-zinc-500 mt-1 text-sm">
          Generate realistic AI voiceovers with emotional tones and multilingual support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input & Settings */}
        <div className="space-y-5">
          {/* Text Input */}
          <Card>
            <CardHeader>
              <CardTitle>Script / Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Paste your script or text here. The AI will generate a natural-sounding voiceover..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-40"
              />
              <div className="flex items-center justify-between text-xs text-zinc-600">
                <span>{wordCount} words</span>
                <span>~{estimatedDuration}s duration</span>
              </div>
            </CardContent>
          </Card>

          {/* Voice Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Voice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {VOICES.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-3 rounded-xl text-left border transition-all duration-150 relative ${
                      selectedVoice === voice.id
                        ? "bg-pink-500/15 border-pink-500/40"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {voice.premium && (
                      <span className="absolute top-2 right-2 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full px-1.5 py-0.5">
                        PRO
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        voice.gender === "female" ? "bg-pink-500/20" : "bg-blue-500/20"
                      }`}>
                        {voice.gender === "female" ? "👩" : "👨"}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${selectedVoice === voice.id ? "text-pink-300" : "text-zinc-300"}`}>
                          {voice.name}
                        </div>
                        <div className="text-xs text-zinc-600">{voice.tone}</div>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">{voice.sample}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Voice Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                Voice Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {VOICE_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`p-3 rounded-lg text-left border transition-all duration-150 ${
                      selectedMode === mode.id
                        ? "bg-purple-500/15 border-purple-500/40"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className={`text-xs font-semibold mb-0.5 ${selectedMode === mode.id ? "text-purple-300" : "text-zinc-300"}`}>
                      {mode.label}
                    </div>
                    <div className="text-xs text-zinc-600">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card className="p-4">
            <Select
              label="Language"
              options={LANGUAGES}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
            />
          </Card>
        </div>

        {/* Right: Controls & Output */}
        <div className="space-y-5">
          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-zinc-400" />
                Voice Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "Stability", desc: "Controls voice consistency", value: stability, setter: setStability, color: "from-purple-600 to-purple-800" },
                { label: "Clarity & Similarity", desc: "How closely it matches the voice", value: similarity, setter: setSimilarity, color: "from-blue-600 to-blue-800" },
                { label: "Style Intensity", desc: "Exaggeration of voice style", value: styleIntensity, setter: setStyleIntensity, color: "from-pink-600 to-pink-800" },
              ].map((setting) => (
                <div key={setting.label}>
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-zinc-300">{setting.label}</div>
                      <div className="text-xs text-zinc-600">{setting.desc}</div>
                    </div>
                    <span className="text-sm font-bold text-zinc-200">{setting.value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={setting.value}
                    onChange={(e) => setting.setter(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Generated Voiceover Player */}
          {generated ? (
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-200">Voiceover Ready</div>
                  <div className="text-xs text-zinc-500">
                    {VOICES.find(v => v.id === selectedVoice)?.name} • ~{estimatedDuration}s
                  </div>
                </div>
                <Badge variant="green" className="ml-auto">Ready</Badge>
              </div>

              {/* Waveform */}
              <div className="h-16 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center px-4 mb-4">
                <div className="flex items-center gap-0.5 h-8 w-full">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-pink-500/60"
                      style={{
                        height: `${Math.random() * 70 + 30}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-500 transition-colors"
                >
                  {playing ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>
                <div className="flex-1">
                  <Progress value={playing ? 45 : 0} barClassName="bg-gradient-to-r from-pink-600 to-pink-800" />
                  <div className="flex justify-between mt-1 text-xs text-zinc-600">
                    <span>{playing ? "0:12" : "0:00"}</span>
                    <span>0:{estimatedDuration.toString().padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setGenerated(false)}>
                    <RefreshCw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center mx-auto mb-4 float">
                <Mic className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-zinc-300 font-semibold mb-2">No Voiceover Yet</h3>
              <p className="text-zinc-600 text-sm">
                Enter your script and click generate to create a realistic AI voiceover
              </p>
            </Card>
          )}

          {/* Voice Preview Samples */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Voice Previews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {VOICES.slice(0, 3).map((voice) => (
                <div key={voice.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 transition-colors group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    voice.gender === "female" ? "bg-pink-500/20" : "bg-blue-500/20"
                  }`}>
                    {voice.gender === "female" ? "👩" : "👨"}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-zinc-300">{voice.name}</div>
                    <div className="text-xs text-zinc-600">{voice.tone} • {voice.language}</div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Play className="w-3 h-3 text-zinc-400" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            loading={loading}
          >
            <Mic className="w-4 h-4" />
            {loading ? "Generating Voiceover..." : "Generate Voiceover"}
          </Button>
        </div>
      </div>
    </div>
  );
}
