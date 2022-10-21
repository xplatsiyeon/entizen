/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['https://test-entizen.s3.ap-northeast-2.amazonaws.com'],
  },

  async rewrites() {
    return [
      {
        source: '/oauth2.0/:path*', // url이 source에 해당될 경우
        destination: 'https://nid.naver.com/oauth2.0/:path*', // destination으로 redirect
      },
    ];
  },
};

module.exports = nextConfig;
