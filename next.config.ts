import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [32, 64, 128, 256, 384],
    qualities: [75, 90],
  },
  async headers() {
    // Next.js merges matching header rules in array order; later rules override
    // earlier ones for the same key. The default must come first so the more
    // specific rules below win for assets that should be cached.
    return [
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
      {
        // Public assets (images, videos, fonts) — content is stable, cache a year.
        source: "/:path*.:ext(mp4|webm|mov|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Hashed Next.js build output — safe to cache forever.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default config;
