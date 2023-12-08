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
      /*{
         source: '/api/:path*',
         destination: `https://api.entizen.kr/:path*`,
      },*/
      {
        source: '/oauth2.0/:path*', // url이 source에 해당될 경우
        destination: 'https://nid.naver.com/oauth2.0/:path*', // destination으로 redirect
      },
      {
        source: '/zapier/submit/:path*', // 공용 폼 제출
        destination: 'https://hooks.zapier.com/hooks/catch/8791679/3f4shlg/', // destination으로 redirect
      },
      {
        source: '/zapier/submit-private/:path*', // 비공용 폼 제출
        destination: 'https://hooks.zapier.com/hooks/catch/8791679/3f2b75d', // destination으로 redirect
      },
      {
        source: '/zapier/company-request/:path*', // 요청업체 제출
        destination: 'https://hooks.zapier.com/hooks/catch/8791679/3f1qgqv', // destination으로 redirect
      },
      {
        source: '/zapier/company-selection/:path*', // 비공용:업체에 실사 신청하기
        destination: 'https://hooks.zapier.com/hooks/catch/8791679/3f40ngg', // destination으로 redirect
      },
    ];
  },
};

module.exports = nextConfig;
