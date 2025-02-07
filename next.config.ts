import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  // we will handle errors with git action hooks
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [220, 390, 430, 640, 768, 1080, 1280, 1920, 2048, 2560, 3840],
  },
}

export default nextConfig
