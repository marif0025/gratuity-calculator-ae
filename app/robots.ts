import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: '/',
            },
        ],
        sitemap: (process.env.SITE_URL || 'http://localhost:3000') + '/sitemap.xml',
    };
}
