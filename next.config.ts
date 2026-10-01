import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  allowedDevOrigins: ["*.e2b.app", "*.ideavo.app", "*.ideavo.ai"],
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        condition: { not: "foreign" },
        loaders: [require.resolve("@ideavo/webpack-tagger")],
      },
    },
  },
};

export default nextConfig;
