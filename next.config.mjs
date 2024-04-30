/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.ohou.se",
      },
      {
        protocol: "https",
        hostname: "image.ohouse.com",
      },
    ],
  },
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/applyAd",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
