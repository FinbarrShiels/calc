import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/calculator/meters-to-feet-&-inches',
        destination: '/calculator/meters-to-feet-inches',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
