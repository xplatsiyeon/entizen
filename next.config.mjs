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
  };
  
  export default nextConfig;
  