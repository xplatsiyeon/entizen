/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'https://test-entizen.s3.ap-northeast-2.amazonaws.com',
      's3.amazonaws.com',
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  async rewrites() {
    return [
      // 로컬에서 사용할때만 활성화 시키기
      /*{
         source: '/api/:path*',
         destination: `https://test-api.entizen.kr/:path*`,
       },*/
      {
        source: '/api/:path*',
        destination: `https://api.entizen.kr/:path*`,
      },
      {
        source: '/oauth2.0/:path*', // url이 source에 해당될 경우
        destination: 'https://nid.naver.com/oauth2.0/:path*', // destination으로 redirect
      },
    ];
  },
  
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  
};

module.exports = nextConfig;
