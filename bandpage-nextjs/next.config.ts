import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add webpack configuration for SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i, // Changed regex to be case-insensitive
      issuer: { and: [/\.(js|ts|jsx|tsx)$/] }, // Ensure it applies to JS/TS files
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // Optional SVGR options
            icon: true, // Treat SVGs as icons
            svgo: true, // Use SVGO to optimize
            // svgoConfig: { plugins: [{ name: 'removeViewBox', active: false }] }, // Example: Keep viewBox
            titleProp: true, // Add title prop for accessibility
            ref: true, // Allow passing refs
          },
        },
      ],
    });

    return config;
  },
  /* other config options here */
};

export default nextConfig;
