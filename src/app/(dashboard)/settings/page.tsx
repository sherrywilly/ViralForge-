"use client";

import { useState } from "react";
import { Settings, User, Bell, Shield, CreditCard, Link2, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "connections", label: "Social Accounts", icon: Link2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

const SOCIAL_PLATFORMS = [
  { id: "tiktok", label: "TikTok", icon: "🎵", connected: true, username: "@viralcreator" },
  { id: "instagram", label: "Instagram", icon: "📸", connected: false, username: "" },
  { id: "youtube", label: "YouTube", icon: "▶️", connected: true, username: "ViralForge Channel" },
  { id: "twitter", label: "X / Twitter", icon: "𝕏", connected: false, username: "" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Settings className="w-5 h-5 text-zinc-400" />
          </div>
          Settings
        </h1>
        <p className="text-zinc-500 mt-1 text-sm">Manage your account, connections, and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-500/15 border border-purple-500/20 text-purple-300"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {activeTab === "profile" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                      🎭
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">Upload Photo</Button>
                      <p className="text-xs text-zinc-600 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" defaultValue="John" />
                    <Input label="Last Name" placeholder="Creator" defaultValue="Creator" />
                  </div>
                  <Input label="Email Address" placeholder="john@example.com" defaultValue="john@viralforge.ai" type="email" />
                  <Input label="Username" placeholder="@username" defaultValue="@viralcreator" />
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Primary Niche</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-purple-500/50">
                      <option>💪 Motivation</option>
                      <option>💰 Finance</option>
                      <option>🏋️ Fitness</option>
                      <option>💎 Luxury</option>
                      <option>🤖 AI News</option>
                    </select>
                  </div>
                  <Button variant="gradient" onClick={handleSave} loading={saving}>
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "connections" && (
            <Card>
              <CardHeader>
                <CardTitle>Connected Social Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <div key={platform.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xl">
                        {platform.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-200">{platform.label}</div>
                        {platform.connected ? (
                          <div className="text-xs text-green-400">{platform.username}</div>
                        ) : (
                          <div className="text-xs text-zinc-600">Not connected</div>
                        )}
                      </div>
                    </div>
                    {platform.connected ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="green" size="sm">Connected</Badge>
                        <Button variant="ghost" size="sm">Disconnect</Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">Free Plan</span>
                        <Badge variant="ghost" size="sm">Current</Badge>
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">5 videos/month · Watermarked · 720p</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">£0</div>
                      <div className="text-xs text-zinc-600">per month</div>
                    </div>
                  </div>
                  <Button variant="gradient" className="w-full">
                    Upgrade to Creator — £19/mo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Videos Generated", used: 3, max: 5 },
                    { label: "AI Credits Used", used: 53, max: 100 },
                    { label: "Storage Used", used: 240, max: 500, unit: "MB" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-zinc-400">{item.label}</span>
                        <span className="text-zinc-300 font-medium">
                          {item.used}{item.unit || ""} / {item.max}{item.unit || ""}
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            (item.used / item.max) > 0.8
                              ? "from-red-600 to-red-800"
                              : "from-purple-600 to-blue-600"
                          }`}
                          style={{ width: `${(item.used / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Video Generation Complete", desc: "When your AI video is ready", enabled: true },
                  { label: "Scheduled Post Published", desc: "When your content is auto-posted", enabled: true },
                  { label: "Trend Alerts", desc: "When new viral trends are detected", enabled: true },
                  { label: "Low Credit Warning", desc: "When AI credits are running low", enabled: false },
                  { label: "Weekly Analytics Report", desc: "Weekly performance summary email", enabled: false },
                  { label: "New Feature Announcements", desc: "Product updates and new features", enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-zinc-200">{item.label}</div>
                      <div className="text-xs text-zinc-500">{item.desc}</div>
                    </div>
                    <button
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        item.enabled ? "bg-purple-600" : "bg-zinc-700"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        item.enabled ? "translate-x-5" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                <Button variant="secondary" onClick={handleSave} loading={saving}>
                  Update Password
                </Button>
                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-zinc-200">Two-Factor Authentication</div>
                      <div className="text-xs text-zinc-500">Add extra security to your account</div>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
