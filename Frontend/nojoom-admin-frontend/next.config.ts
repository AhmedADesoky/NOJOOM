import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/NOJOOM_Website/admin',
  images: { unoptimized: true },
};

export default nextConfig;
