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
      // Same picks as /best/student; "College & University" intent lives on /best/college.
      { source: "/laptop/reviews/best/university-students", destination: "/laptop/reviews/best/college", permanent: true },
      // Thin duplicate merged into the full Mac vs Windows guide.
      { source: "/laptop/learn/macbook-vs-windows-laptop", destination: "/laptop/learn/mac-vs-windows-laptop", permanent: true },
    ];
  },
};

export default nextConfig;
