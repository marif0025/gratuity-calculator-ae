import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
};

export default nextConfig;
