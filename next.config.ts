import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Strict mode helps catch potential issues before deployment
  reactStrictMode: true,

  // Allow images from external sources if needed in the future
  images: {
    remotePatterns: [],
  },

  // Security: prevent the X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
