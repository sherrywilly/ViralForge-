"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "hover";
}

function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default: "bg-[#111113] border border-zinc-800 rounded-xl",
    glass: "glass-card",
    gradient:
      "bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl",
    hover: "bg-[#111113] border border-zinc-800 rounded-xl transition-all duration-200 hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer",
  };

  return (
    <div className={cn(variants[variant], className)} {...props} />
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pb-0", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold text-zinc-100", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-zinc-500 mt-1", className)} {...props} />
  );
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0 flex items-center", className)} {...props} />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
