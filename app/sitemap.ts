import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/sanity/requests/blog'
import { getAllPages } from '@/sanity/requests'

const baseUrl = process.env.SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ]

    const pages = await getAllPages();
    const pageRoutes: MetadataRoute.Sitemap = pages.filter(p => p.seo?.indexable).map(page => ({
        url: `${baseUrl}/${page.slug.current}`,
        lastModified: page.createdAt ? new Date(page.createdAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }))

    const blogs = await getAllBlogs();

    const blogRoutes: MetadataRoute.Sitemap = blogs.filter(b => b.seo?.indexable).map(blog => ({
        url: `${baseUrl}/blog/${blog.slug.current}`,
        lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...blogRoutes, ...pageRoutes]
}
