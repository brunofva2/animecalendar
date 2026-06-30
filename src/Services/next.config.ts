import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net', // Domínio das fotos da API Jikan
      },
    ],
  },
}

export default nextConfig
