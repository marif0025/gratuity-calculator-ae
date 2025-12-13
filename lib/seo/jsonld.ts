import type {
    Article,
    Organization,
    WebSite,
    SoftwareApplication,
    FAQPage,
    WebPage,
    BreadcrumbList,
    CollectionPage,
    WithContext,
    ImageObject,
    Person,
    Organization as OrganizationType,
    Offer,
    Question,
    Answer,
    ListItem,
    ItemList,
    SearchAction,
    EntryPoint,
} from 'schema-dts';

// Input interfaces for function parameters (simplified from schema-dts for easier usage)
interface ArticleInput {
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

interface CollectionPageInput {
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

interface OrganizationInput {
    name: string
    url: string
    logo?: {
        url: string
        width?: number
        height?: number
    }
}

interface WebsiteInput {
    name: string
    url: string
    potentialAction?: {
        searchUrl?: string
    }
}

interface SoftwareApplicationInput {
    name: string
    description: string
    url: string
    operatingSystem: string
    applicationCategory: string
    offers: {
        price: number
        priceCurrency: string
    }
}

interface FAQPageInput {
    mainEntity: Array<{
        question: string
        answer: string
    }>
}

interface WebPageInput {
    name: string
    description?: string
    url: string
    isPartOf?: {
        '@id': string
    }
}

export const renderJsonLd = {
    article(data: ArticleInput): string {
        const author: Person | OrganizationType = {
            '@type': data.author['@type'] as 'Person' | 'Organization',
            name: data.author.name,
        }

        const publisher: OrganizationType = {
            '@type': 'Organization',
            name: data.publisher.name,
        }

        const jsonLd: WithContext<Article> = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.headline,
            ...(data.description && { description: data.description }),
            ...(data.datePublished && { datePublished: data.datePublished }),
            ...(data.dateModified && { dateModified: data.dateModified }),
            author,
            publisher,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': data.mainEntityOfPage['@id'],
            },
            ...(data.image && {
                image: {
                    '@type': 'ImageObject',
                    url: data.image.url,
                    ...(data.image.width && { width: data.image.width }),
                    ...(data.image.height && { height: data.image.height }),
                } as ImageObject,
            }),
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    collectionPage(data: CollectionPageInput): string {
        const jsonLd: WithContext<CollectionPage> = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: data.name,
            ...(data.description && { description: data.description }),
            url: data.url,
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: data.itemListElement,
            } as ItemList,
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    breadcrumbList(items: BreadcrumbItem[]): string {
        const jsonLd: WithContext<BreadcrumbList> = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url,
            })) as ListItem[],
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    organization(data: OrganizationInput): string {
        const jsonLd: WithContext<Organization> = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: data.name,
            url: data.url,
            ...(data.logo && {
                logo: {
                    '@type': 'ImageObject',
                    url: data.logo.url,
                    ...(data.logo.width && { width: data.logo.width }),
                    ...(data.logo.height && { height: data.logo.height }),
                } as ImageObject,
            }),
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    website(data: WebsiteInput): string {
        const jsonLd: WithContext<WebSite> = {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: data.name,
            url: data.url,
            ...(data.potentialAction?.searchUrl && {
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: data.potentialAction.searchUrl,
                    } as EntryPoint,
                    'query-input': 'required name=search_term_string',
                } as SearchAction,
            }),
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    softwareApplication(data: SoftwareApplicationInput): string {
        const jsonLd: WithContext<SoftwareApplication> = {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: data.name,
            description: data.description,
            url: data.url,
            operatingSystem: data.operatingSystem,
            applicationCategory: data.applicationCategory,
            offers: {
                '@type': 'Offer',
                price: data.offers.price,
                priceCurrency: data.offers.priceCurrency,
            } as Offer,
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    faqPage(data: FAQPageInput): string {
        const jsonLd: WithContext<FAQPage> = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.mainEntity.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                } as Answer,
            })) as Question[],
        }

        return JSON.stringify(jsonLd, null, 0)
    },

    webPage(data: WebPageInput): string {
        const jsonLd: WithContext<WebPage> = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: data.name,
            url: data.url,
            ...(data.description && { description: data.description }),
            ...(data.isPartOf && { isPartOf: data.isPartOf }),
        }

        return JSON.stringify(jsonLd, null, 0)
    }
}
