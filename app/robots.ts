import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: '/',
            },
            // {
            //     userAgent: '*',
            //     allow: ['/blog', '/blog/*'],
            // }
        ],
        // sitemap: (process.env.SITE_URL || 'https://yourdomain.com') + '/sitemap.xml',
    };
}
