/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['localhost', '*', 'img.hazzys.com'],
  },
};

module.exports = nextConfig;
