import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  poweredByHeader: false,
  typedRoutes: true,
  async rewrites() {
    const apiUrl = process.env.API_URL || (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");
    return apiUrl ? [{ source: "/api/:path*", destination: `${apiUrl}/api/:path*` }] : [];
  },
};

export default nextConfig;
