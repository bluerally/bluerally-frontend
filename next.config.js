/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.google.com', 'lh3.googleusercontent.com', 'phinf.pstatic.net', 'img.wkorea.com'],
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
}

module.exports = nextConfig
