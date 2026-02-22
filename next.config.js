/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Portfoliomain',
  assetPrefix: '/Portfoliomain/',
  distDir: 'docs',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
