/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["github.com", "digitalcrown.in", "194.62.96.140"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "194.62.96.140",
        port: "8081",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "",
      },
      {
        protocol: "https",
        hostname: "digitalcrown.in",
        port: "",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
