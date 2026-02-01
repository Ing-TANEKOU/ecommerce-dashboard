import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Ignorer erreurs ESLint pendant le build production
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorer erreurs TypeScript pendant le build (temporaire)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;