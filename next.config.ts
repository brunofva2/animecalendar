/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite que qualquer imagem vinda do MyAnimeList seja renderizada e otimizada
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
