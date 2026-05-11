"use client";

import { useState } from "react";
import { Calendar, Plus, ChevronLeft, ChevronRight, Sparkles, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: "bg-pink-500/20 border-pink-500/40 text-pink-300",
  Instagram: "bg-purple-500/20 border-purple-500/40 text-purple-300",
  YouTube: "bg-red-500/20 border-red-500/40 text-red-300",
  Twitter: "bg-blue-500/20 border-blue-500/40 text-blue-300",
};

const SCHEDULED_POSTS = [
  { id: "1", day: 12, title: "Morning Motivation", platform: "TikTok", time: "9:00 AM", status: "scheduled" },
  { id: "2", day: 14, title: "Finance Tip #47", platform: "Instagram", time: "6:00 PM", status: "scheduled" },
  { id: "3", day: 15, title: "AI News Update", platform: "YouTube", time: "12:00 PM", status: "scheduled" },
  { id: "4", day: 17, title: "Mindset Shift", platform: "TikTok", time: "8:00 AM", status: "draft" },
  { id: "5", day: 19, title: "Luxury Lifestyle Tips", platform: "Instagram", time: "7:00 PM", status: "scheduled" },
  { id: "6", day: 21, title: "Business Growth Hacks", platform: "YouTube", time: "2:00 PM", status: "scheduled" },
  { id: "7", day: 22, title: "Viral Hook Compilation", platform: "TikTok", time: "10:00 AM", status: "draft" },
  { id: "8", day: 25, title: "Weekly Finance Recap", platform: "Instagram", time: "5:00 PM", status: "scheduled" },
];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getPostsForDay = (day: number) => {
    return SCHEDULED_POSTS.filter((p) => p.day === day);
  };

  const generatePlan = async () => {
    setGeneratingPlan(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGeneratingPlan(false);
    toast.success("30-day content plan generated! 📅");
  };

  const selectedDayPosts = selectedDay ? getPostsForDay(selectedDay) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-blue-500/15 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            Content Calendar
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Plan, schedule, and auto-post your content across all platforms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={generatePlan} loading={generatingPlan}>
            <Sparkles className="w-4 h-4" />
            Generate 30-Day Plan
          </Button>
          <Button variant="gradient">
            <Plus className="w-4 h-4" />
            Schedule Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {MONTHS[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex gap-1">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-zinc-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for first week */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-16" />
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const posts = getPostsForDay(day);
                  const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(isSelected ? null : day)}
                      className={`h-16 rounded-lg p-1.5 text-left transition-all duration-150 relative ${
                        isSelected
                          ? "bg-purple-500/20 border border-purple-500/40"
                          : isToday
                          ? "bg-zinc-800 border border-zinc-700"
                          : "hover:bg-zinc-900 border border-transparent"
                      }`}
                    >
                      <div className={`text-xs font-semibold mb-1 ${
                        isToday ? "text-purple-400" : isSelected ? "text-purple-300" : "text-zinc-400"
                      }`}>
                        {day}
                        {isToday && <span className="ml-1 text-[9px] text-purple-500">TODAY</span>}
                      </div>
                      <div className="space-y-0.5">
                        {posts.slice(0, 2).map((post) => (
                          <div
                            key={post.id}
                            className={`h-1.5 rounded-full text-[8px] truncate ${
                              post.platform === "TikTok"
                                ? "bg-pink-500"
                                : post.platform === "Instagram"
                                ? "bg-purple-500"
                                : post.platform === "YouTube"
                                ? "bg-red-500"
                                : "bg-blue-500"
                            }`}
                          />
                        ))}
                        {posts.length > 2 && (
                          <div className="text-[9px] text-zinc-600">+{posts.length - 2}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                {["TikTok", "Instagram", "YouTube", "Twitter"].map((p) => (
                  <div key={p} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      p === "TikTok" ? "bg-pink-500" :
                      p === "Instagram" ? "bg-purple-500" :
                      p === "YouTube" ? "bg-red-500" : "bg-blue-500"
                    }`} />
                    <span className="text-xs text-zinc-500">{p}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Posts */}
          {selectedDay && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  {MONTHS[currentMonth]} {selectedDay} — {selectedDayPosts.length > 0 ? `${selectedDayPosts.length} posts scheduled` : "No posts scheduled"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDayPosts.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="text-3xl mb-2">📭</div>
                    <p className="text-zinc-500 text-sm">No posts scheduled for this day</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Plus className="w-3.5 h-3.5" />
                      Schedule Post
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDayPosts.map((post) => (
                      <div
                        key={post.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${PLATFORM_COLORS[post.platform]}`}
                      >
                        <div className="text-center">
                          <div className="text-xs font-bold">{post.time}</div>
                        </div>
                        <div className="w-px h-8 bg-current opacity-20" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{post.title}</div>
                          <div className="text-xs opacity-70">{post.platform}</div>
                        </div>
                        <Badge
                          variant={post.status === "scheduled" ? "green" : "yellow"}
                          size="sm"
                        >
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SCHEDULED_POSTS.slice(0, 6).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      post.platform === "TikTok" ? "bg-pink-500/20 text-pink-400" :
                      post.platform === "Instagram" ? "bg-purple-500/20 text-purple-400" :
                      post.platform === "YouTube" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {post.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-zinc-300 truncate">{post.title}</div>
                      <div className="text-xs text-zinc-600">{post.platform} · {post.time}</div>
                    </div>
                    <Badge variant={post.status === "scheduled" ? "green" : "yellow"} size="sm">
                      {post.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Times to Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                Best Times to Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { platform: "TikTok", times: ["7-9 AM", "6-8 PM"], icon: "🎵" },
                  { platform: "Instagram", times: ["11 AM-1 PM", "7-9 PM"], icon: "📸" },
                  { platform: "YouTube", times: ["12-3 PM"], icon: "▶️" },
                ].map((item) => (
                  <div key={item.platform} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-zinc-300">{item.platform}</div>
                      <div className="text-xs text-zinc-600">{item.times.join(", ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">This Month</h3>
            <div className="space-y-2">
              {[
                { label: "Posts scheduled", value: SCHEDULED_POSTS.length },
                { label: "Auto-posting enabled", value: "3 platforms" },
                { label: "Next post", value: "Tomorrow 9AM" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="text-zinc-300 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
