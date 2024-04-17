/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/api/auth/auth/:slug',
        destination: '/auth/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
