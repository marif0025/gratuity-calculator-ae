import type { Metadata } from 'next'
import type { SanitySEO } from './types'

interface SEOHelperOptions {
    title?: string
    description?: string
    url?: string
    siteName?: string
    defaultImage?: string
}

/**
 * Transform Sanity SEO data into Next.js metadata
 * @param seo - Sanity SEO object
 * @param options - Additional options for metadata
 * @returns Next.js Metadata object
 */
export function transformSEOToMetadata(
    seo?: SanitySEO,
    options: SEOHelperOptions = {}
): Metadata {
    const {
        title: fallbackTitle,
        description: fallbackDescription,
        url,
        siteName = 'Gratuity Calculator',
        defaultImage = '/og-default.jpg',
    } = options

    // Use SEO data or fallback to options
    const title = seo?.meta_title || fallbackTitle
    const description = seo?.meta_description || fallbackDescription

    const metadata: Metadata = {
        title: title ? `${title} | ${siteName}` : siteName,
        description: description || 'Calculate your gratuity with our free online calculator',
        keywords: seo?.keywords,
        robots: {
            index: seo?.indexable !== false, // Default to true unless explicitly false
            follow: true,
        },
    }

    // Open Graph metadata
    if (title || description) {
        metadata.openGraph = {
            title: title || siteName,
            description: description || 'Calculate your gratuity with our free online calculator',
            type: 'website',
            url: url,
            siteName: siteName,
            images: seo?.open_graph_image
                ? [
                    {
                        url: seo.open_graph_image.asset.url,
                        width: seo.open_graph_image.asset.metadata.dimensions.width,
                        height: seo.open_graph_image.asset.metadata.dimensions.height,
                        alt: seo.open_graph_image.alt || title || siteName,
                    },
                ]
                : [
                    {
                        url: defaultImage,
                        width: 1200,
                        height: 630,
                        alt: title || siteName,
                    },
                ],
        }
    }

    // Twitter metadata
    if (title || description) {
        metadata.twitter = {
            card: 'summary_large_image',
            title: title || siteName,
            description: description || 'Calculate your gratuity with our free online calculator',
            images: seo?.open_graph_image
                ? [seo.open_graph_image.asset.url]
                : [defaultImage],
        }
    }

    return metadata
}

/**
 * Generate metadata for blog posts
 * @param blog - Blog data with SEO
 * @param options - Additional options
 * @returns Next.js Metadata object
 */
export function generateBlogMetadata(
    blog: { title: string; description?: string; seo?: SanitySEO; slug: { current: string } },
    options: { siteName?: string; baseUrl?: string } = {}
): Metadata {
    const { siteName = 'Gratuity Calculator', baseUrl = 'https://gratuity-calculator.com' } = options

    return transformSEOToMetadata(blog.seo, {
        title: blog.title,
        description: blog.description,
        url: `${baseUrl}/blog/${blog.slug.current}`,
        siteName,
    })
}

/**
 * Generate metadata for category pages
 * @param category - Category data with SEO
 * @param options - Additional options
 * @returns Next.js Metadata object
 */
export function generateCategoryMetadata(
    category: { name: string; description?: string; seo?: SanitySEO; slug: { current: string } },
    options: { siteName?: string; baseUrl?: string } = {}
): Metadata {
    const { siteName = 'Gratuity Calculator', baseUrl = 'https://gratuity-calculator.com' } = options

    return transformSEOToMetadata(category.seo, {
        title: category.name,
        description: category.description,
        url: `${baseUrl}/category/${category.slug.current}`,
        siteName,
    })
}

/**
 * Generate metadata for pages
 * @param page - Page data with SEO
 * @param options - Additional options
 * @returns Next.js Metadata object
 */
export function generatePageMetadata(
    page: { title: string; description?: string; seo?: SanitySEO; slug: { current: string } },
    options: { siteName?: string; baseUrl?: string } = {}
): Metadata {
    const { siteName = 'Gratuity Calculator', baseUrl = 'https://gratuity-calculator.com' } = options

    return transformSEOToMetadata(page.seo, {
        title: page.title,
        description: page.description,
        url: `${baseUrl}/${page.slug.current}`,
        siteName,
    })
}

/**
 * Generate metadata for home page
 * @param home - Home data with SEO
 * @param options - Additional options
 * @returns Next.js Metadata object
 */
export function generateHomeMetadata(
    home: { title?: string; seo?: SanitySEO },
    options: { siteName?: string; baseUrl?: string } = {}
): Metadata {
    const { siteName = 'Gratuity Calculator', baseUrl = 'https://gratuity-calculator.com' } = options

    return transformSEOToMetadata(home.seo, {
        title: home.title || 'Home',
        description: 'Calculate your gratuity with our free online calculator. Get instant results and understand your entitlements.',
        url: baseUrl,
        siteName,
    })
}

/**
 * Generate metadata for site config
 * @param config - Config data with SEO
 * @param options - Additional options
 * @returns Next.js Metadata object
 */
export function generateConfigMetadata(
    config: { site_name?: string; seo?: SanitySEO },
    options: { baseUrl?: string } = {}
): Metadata {
    const { baseUrl = 'https://gratuity-calculator.com' } = options

    return transformSEOToMetadata(config.seo, {
        title: config.site_name || 'Gratuity Calculator',
        description: 'Calculate your gratuity with our free online calculator. Get instant results and understand your entitlements.',
        url: baseUrl,
        siteName: config.site_name || 'Gratuity Calculator',
    })
}
