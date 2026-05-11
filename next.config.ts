import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "media.viralforge.ai" },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "viralforge.ai"],
    },
  },
};

export default nextConfig;
