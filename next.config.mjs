/** @type {import('next').NextConfig} */
const nextConfig = {
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
