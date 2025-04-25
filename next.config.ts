import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
    // Réactivation de la vérification des erreurs TypeScript
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
