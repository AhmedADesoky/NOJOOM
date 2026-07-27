import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/NOJOOM/admin',
  images: { unoptimized: true },
};

export default nextConfig;
