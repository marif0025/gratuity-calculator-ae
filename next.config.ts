import type { NextConfig } from "next";

const redirects: NextConfig['redirects'] = () => [
    {
        source: `/blog/about-uae-gratuity-calculator-tool-2025/`,
        destination: '/blog/about-uae-gratuity-calculator-tool/',
        permanent: true,
    },
    {
        source: `/blog/uae-gratuity-calculator-usage-guide-2025/`,
        destination: '/blog/uae-gratuity-calculator-usage-guide/',
        permanent: true,
    },
    {
        source: `/blog/common-gratuity-mistakes-uae-2025/`,
        destination: '/blog/common-gratuity-mistakes/',
        permanent: true,
    },
    {
        source: '/blog/free-zone-gratuity-rules-uae-2025/',
        destination: '/blog/uae-free-zone-gratuity-rules/',
        permanent: true,
    },
    {
        source: '/blog/mohre-labour-law-uae-2025/',
        destination: '/blog/uae-mohre-labour-law/',
        permanent: true,
    },
    {
        source: `/blog/gratuity-eligibility-rules-uae-2025/`,
        destination: '/blog/uae-gratuity-eligibility-rules/',
        permanent: true,
    },
    {
        source: `/blog/uae-labour-law-2025/`,
        destination: '/blog/uae-labour-law/',
        permanent: true,
    },
    {
        source: `/blog/gratuity-rules-for-housemaids-domestic-workers-uae-2025/`,
        destination: '/blog/uae-gratuity-rules-for-housemaids-domestic-workers/',
        permanent: true,
    },
]

const nextConfig: NextConfig = {
    trailingSlash: true,
    redirects,
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
