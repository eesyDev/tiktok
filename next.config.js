/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  images: {
    domains: [
      'image.jpeg',
      'lh3.googleusercontent.com',
      'images.unsplash.com'
    ]
  }
}

module.exports = nextConfig
