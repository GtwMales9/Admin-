/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan konfigurasi jika diperlukan, misalnya untuk gambar eksternal (Cloudinary)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;