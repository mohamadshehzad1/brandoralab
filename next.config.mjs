/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },

  // ----------- Ezoic Ads.txt Redirect -----------
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/19390/brandoralab.com',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
