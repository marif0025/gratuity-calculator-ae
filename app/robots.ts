import { getConfig } from "@/sanity/requests";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const config = await getConfig();
    const sitemap = config?.seo?.sitemap_url || (process.env.SITE_URL || 'http://localhost:3000') + '/sitemap.xml';
    const indexable = config?.seo?.indexable ?? true;

    return {
        rules: {
            userAgent: '*',
            allow: indexable ? '*' : undefined,
            disallow: indexable ? undefined : '/',
        },
        sitemap,
    };
}
