/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: { resolve: { fallback: any; }; }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
      path: false,
    };
    return config;
  },
  images: {
    domains: ['images.unsplash.com'], // Agrega el dominio externo aquí
  },
};

module.exports = nextConfig;
