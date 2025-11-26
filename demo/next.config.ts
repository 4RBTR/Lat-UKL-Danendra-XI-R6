import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
            {
                hostname: 'images.unsplash.com', // Domain yang error
            },
        ],
    },
};

export default nextConfig;
