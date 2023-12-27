/** @type {import('next').NextConfig} */
const nextConfig = {
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
