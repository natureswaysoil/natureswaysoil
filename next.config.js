/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
    ],
    // If you're on an older Next, this also works:
    // domains: ['m.media-amazon.com'],
  },
};

module.exports = nextConfig;
