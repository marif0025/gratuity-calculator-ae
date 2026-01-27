import { Metadata } from 'next'
import { seoDefaults } from './defaults'

interface BuildPageMetaInput {
    title?: string
    description?: string
    path: string
    images?: Array<{
        url: string
        width?: number
        height?: number
        alt?: string
    }>
    allowIndex?: boolean
}

export function buildPageMeta({
    title,
    description,
    path,
    images,
    allowIndex = false
}: BuildPageMetaInput): Metadata {
    const fullTitle = title
        ? `${title} | ${seoDefaults.siteName}`
        : seoDefaults.defaultTitle

    const fullDescription = description || seoDefaults.defaultDescription
    const canonicalUrl = `${seoDefaults.baseUrl}${path}`

    const ogImage = images?.[0] || seoDefaults.defaultImages.og
    const twitterImage = images?.[0] || seoDefaults.defaultImages.twitter

    return {
        title: fullTitle,
        description: fullDescription,
        metadataBase: new URL(seoDefaults.baseUrl),
        alternates: {
            canonical: canonicalUrl
        },
        robots: {
            index: allowIndex,
            follow: true
        },
        openGraph: {
            title: fullTitle,
            description: fullDescription,
            url: canonicalUrl,
            siteName: seoDefaults.siteName,
            images: [
                {
                    url: typeof ogImage === 'string' ? ogImage : ogImage.url,
                    width: typeof ogImage === 'string' ? 1200 : ogImage.width || 1200,
                    height: typeof ogImage === 'string' ? 630 : ogImage.height || 630,
                    alt: typeof ogImage === 'string' ? fullTitle : ogImage.alt || fullTitle
                }
            ],
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: fullDescription,
            images: [
                {
                    url: typeof twitterImage === 'string' ? twitterImage : twitterImage.url,
                    width: typeof twitterImage === 'string' ? 1200 : twitterImage.width || 1200,
                    height: typeof twitterImage === 'string' ? 630 : twitterImage.height || 630,
                    alt: typeof twitterImage === 'string' ? fullTitle : twitterImage.alt || fullTitle
                }
            ]
        }
    }
}
