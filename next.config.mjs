/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,

    remotePatterns: [
      {
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "**.blob.core.windows.net",
        pathname: "/admin-images/**",
      },
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000", // Proxy to hosted Backend
      },
    ];
  },
  webpack: (config) => {
    // Custom webpack configuration to optimize chunk splitting
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 200000, // 200KB per chunk
    };

    return config;
  },
};

export default nextConfig;
