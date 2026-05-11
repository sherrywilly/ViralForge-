"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "blue" | "green" | "yellow" | "red" | "ghost";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  const variants = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    green: "bg-green-500/15 text-green-400 border-green-500/25",
    yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    red: "bg-red-500/15 text-red-400 border-red-500/25",
    ghost: "bg-transparent text-zinc-400 border-zinc-800",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}

export function Progress({ value, max = 100, className, barClassName, showLabel }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-zinc-500 mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            barClassName || "bg-gradient-to-r from-purple-600 to-blue-600"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <svg
      className={cn("animate-spin text-purple-500", sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface ViralScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ViralScoreBadge({ score, size = "md" }: ViralScoreBadgeProps) {
  const getColor = () => {
    if (score >= 80) return "bg-green-500/15 text-green-400 border-green-500/25";
    if (score >= 60) return "bg-yellow-500/15 text-yellow-400 border-yellow-500/25";
    if (score >= 40) return "bg-orange-500/15 text-orange-400 border-orange-500/25";
    return "bg-red-500/15 text-red-400 border-red-500/25";
  };

  const getEmoji = () => {
    if (score >= 90) return "🔥";
    if (score >= 75) return "🚀";
    if (score >= 60) return "⚡";
    if (score >= 40) return "📈";
    return "📉";
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border rounded-full font-bold",
        getColor(),
        sizes[size]
      )}
    >
      {getEmoji()} {score}
    </span>
  );
}
