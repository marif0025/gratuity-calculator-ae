interface ArticleData {
    headline: string
    description?: string
    datePublished?: string
    dateModified?: string
    author: {
        '@type': string
        name: string
    }
    publisher: {
        '@type': string
        name: string
    }
    mainEntityOfPage: {
        '@type': string
        '@id': string
    }
    image?: {
        '@type': string
        url: string
        width?: number
        height?: number
    }
}

interface CollectionPageData {
    name: string
    description?: string
    url: string
    itemListElement: Array<{
        '@type': string
        position: number
        item: {
            '@type': string
            headline: string
            description?: string
            url: string
            image?: {
                '@type': string
                url: string
                width?: number
                height?: number
            }
        }
    }>
}

interface BreadcrumbItem {
    name: string
    url: string
}

export const renderJsonLd = {
    article(data: ArticleData): string {
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.headline,
            description: data.description,
            datePublished: data.datePublished,
            dateModified: data.dateModified,
            author: data.author,
            publisher: data.publisher,
            mainEntityOfPage: data.mainEntityOfPage,
            ...(data.image && { image: data.image })
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    collectionPage(data: CollectionPageData): string {
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: data.name,
            description: data.description,
            url: data.url,
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: data.itemListElement
            }
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    breadcrumbList(items: BreadcrumbItem[]): string {
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    organization(): string {
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Gratuity Calculator',
            url: 'https://yourdomain.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://yourdomain.com/logo.png'
            }
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    website(): string {
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Gratuity Calculator',
            url: 'https://yourdomain.com',
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://yourdomain.com/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
            }
        }

        return JSON.stringify(jsonLd, null, 0)
    }
}
