import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViralForge AI – Create Viral Videos in Minutes",
  description:
    "AI-powered platform for creators, businesses, and marketers to generate viral short-form videos automatically. Create TikTok, Reels, and YouTube Shorts with AI.",
  keywords: ["AI video", "viral content", "TikTok", "Instagram Reels", "YouTube Shorts", "content creation"],
  openGraph: {
    title: "ViralForge AI – Create Viral Videos in Minutes",
    description: "Create viral videos using AI in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased dark">
        <body className="min-h-full flex flex-col bg-[#09090b] text-[#fafafa] font-sans">
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#111113",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                color: "#fafafa",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
