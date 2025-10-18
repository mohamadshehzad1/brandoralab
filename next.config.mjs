/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false, 
    domains: ['res.cloudinary.com'], // ✅ Add this line
  },
};

export default nextConfig;
