import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/sanity/requests/blog'
import { getAllCategories, getAllPages, getConfig } from '@/sanity/requests'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const config = await getConfig();
    const baseUrl = config?.seo?.base_path || process.env.SITE_URL || 'http://localhost:3000';
    const indexable = config?.seo?.indexable ?? true;

    if (!indexable) {
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 1,
            }
        ];
    }

    // Fetch all data in parallel for better performance
    const [pages, blogs, categories] = await Promise.all([
        getAllPages(),
        getAllBlogs(),
        getAllCategories(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const pageRoutes: MetadataRoute.Sitemap = pages
        .filter(p => p.seo?.indexable !== false)
        .map(page => ({
            url: `${baseUrl}/${page.slug.current}`,
            lastModified: page.updatedAt
                ? new Date(page.updatedAt)
                : page.createdAt
                    ? new Date(page.createdAt)
                    : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));

    const blogRoutes: MetadataRoute.Sitemap = blogs
        .filter(b => b.seo?.indexable !== false)
        .map(blog => ({
            url: `${baseUrl}/blog/${blog.slug.current}`,
            lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

    const categoryRoutes: MetadataRoute.Sitemap = categories
        .filter(c => c.seo?.indexable !== false)
        .map(category => ({
            url: `${baseUrl}/category/${category.slug.current}`,
            lastModified: category.updatedAt
                ? new Date(category.updatedAt)
                : category.createdAt
                    ? new Date(category.createdAt)
                    : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));

    return [...staticRoutes, ...blogRoutes, ...pageRoutes, ...categoryRoutes];
}
