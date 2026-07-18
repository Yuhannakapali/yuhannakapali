import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Served from the custom domain yuhannakapali.com.np at the root,
  // so no basePath/assetPrefix is needed.
  // Emit directory-style routes (blog/index.html) for clean static hosting.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
