import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
    // Ceci désactive la vérification de type pendant le build
    ignoreBuildErrors: true,
  
  },
  
};

export default nextConfig;
