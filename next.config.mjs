/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Duplicate best lists merged into their canonical versions (same picks, same intent).
      { source: "/laptop/reviews/best/under-500-canada", destination: "/laptop/reviews/best/under-500", permanent: true },
      { source: "/laptop/reviews/best/under-1000-canada", destination: "/laptop/reviews/best/under-1000", permanent: true },
    ];
  },
};

export default nextConfig;
