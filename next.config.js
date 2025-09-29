/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shared.fastly.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/posts/:id',
        destination: '/blog/posts/:id',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
