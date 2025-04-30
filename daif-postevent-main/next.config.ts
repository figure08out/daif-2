import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DIRECT_URL: process.env.DIRECT_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nmbrdjwwhyivqasltaal.supabase.co"
      },
      {
        protocol: "https",
        hostname: "auth.knowtice.ai"
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com"
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com"
      },
      {
        protocol: "https",
        hostname: "uulexbhqdrzdalcddwni.supabase.co"
      }
    ]
  },
};

export default nextConfig;
