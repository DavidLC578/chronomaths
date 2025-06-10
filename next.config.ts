import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Para avatares de Google
      'localhost', // Para desarrollo local
    ],
  },
};

export default nextConfig;
