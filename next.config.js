/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.wkorea.com', 'blue-rally.s3.ap-northeast-2.amazonaws.com'],
  },
  compiler: {
    styledComponents:
      true |
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
  },
};

module.exports = nextConfig;
