/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: [
      'res.cloudinary.com',
      'hel1.static.resmush.it',
      'hel2.static.resmush.it',
      'api.resmush.it',
    ],
  },
};

export default nextConfig;
