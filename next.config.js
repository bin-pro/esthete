/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://github.com/dgu-web-t3-blackshoe/esthete-cms.git"
      : undefined,
};

module.exports = nextConfig;
