// Common types used across multiple schemas
export interface SanityImage {
    asset: {
        _id: string
        url: string
        metadata: {
            dimensions: {
                width: number
                height: number
            }
        }
    }
    alt?: string
}

// Transformed image type for queries that flatten the asset structure
export interface TransformedSanityImage {
    url: string
    width: number
    height: number
    alt?: string
}

export interface SanityLink {
    text: string
    url: string
    is_external?: boolean
}

export interface SanitySEO {
    meta_title?: string
    meta_description?: string
    keywords?: string
    open_graph_image?: SanityImage
    indexable?: boolean
}

// Hero section types
export interface HeroValueProp {
    icon: string
    title: string
    description: string
}

export interface HeroButton {
    label: string
    link: string
    variant: string
}

export interface HeroTrustIndicator {
    icon: string
    text: string
}

export interface HeroStat {
    value: string
    label: string
}

export interface HeroSection {
    eyebrow?: string
    headline?: string
    subheadline?: string
    valueProps?: HeroValueProp[]
    buttons?: HeroButton[]
    trustIndicators?: HeroTrustIndicator[]
    heroImage?: SanityImage
    stats?: HeroStat[]
}

// Home page types
export interface HomeData {
    _id: string
    title?: string // Optional (has initialValue)
    hero?: HeroSection // Optional
    seo?: SanitySEO // Optional
}

// Config types
export interface ConfigSEO {
    meta_title?: string
    meta_description?: string
    favicon?: SanityImage
    open_graph_image?: SanityImage
    base_path?: string
    sitemap_url?: string
    indexable?: boolean
    google_tag?: string
    scripts?: string[]
}

export interface ConfigLogo {
    image?: SanityImage
    url?: string
    text?: string
}

export interface ConfigHeader {
    logo?: ConfigLogo
    menu?: SanityLink[]
    cta_button?: SanityLink
}

export interface ConfigFooter {
    footer_text?: string
    menu?: SanityLink[]
    social_links?: SanityLink[]
}

export interface ConfigData {
    _id: string
    site_name?: string // Optional
    seo?: ConfigSEO // Optional
    header?: ConfigHeader // Optional
    footer?: ConfigFooter // Optional
}

// Blog types
export interface BlogData {
    _id: string
    title: string // Required
    description?: string // Optional
    slug: {
        current: string
    } // Required
    featureImage?: TransformedSanityImage // Optional
    category: CategoryData // Required
    content?: any // PortableText content - Optional
    publishedAt?: string // Optional (has initialValue)
    isPublished?: boolean // Optional (has initialValue)
    seo?: SanitySEO // Optional
}

export interface BlogPreview {
    _id: string
    title: string // Required
    description?: string // Optional
    slug: {
        current: string
    } // Required
    featureImage?: TransformedSanityImage // Optional
    category: CategoryPreview // Required
    publishedAt?: string // Optional
}

export interface BlogSlug {
    slug: {
        current: string
    }
}

// Category types
export interface CategoryData {
    _id: string
    name: string // Required
    description?: string // Optional
    slug: {
        current: string
    } // Required
    seo?: SanitySEO // Optional
}

export interface CategoryPreview {
    _id: string
    name: string // Required
    description?: string // Optional
    slug: {
        current: string
    } // Required
}

export interface CategorySlug {
    slug: {
        current: string
    }
}

// Page types
export interface PageData {
    _id: string
    title: string // Required
    description?: string // Optional
    slug: {
        current: string
    } // Required
    content?: any // PortableText content - Optional
    pageType: 'contact' | 'privacy' | 'terms' | 'about' | 'faq' | 'other' // Required
    isPublished?: boolean // Optional (has initialValue)
    seo?: SanitySEO // Optional
}

export interface PagePreview {
    _id: string
    title: string // Required
    description?: string // Optional
    slug: {
        current: string
    } // Required
    pageType: 'contact' | 'privacy' | 'terms' | 'about' | 'faq' | 'other' // Required
    seo?: SanitySEO // Optional
}

export interface PageSlug {
    slug: {
        current: string
    }
}

// Query response types
export type GetHomeResponse = HomeData | null
export type GetConfigResponse = ConfigData | null
export type GetAllBlogsResponse = BlogPreview[]
export type GetBlogBySlugResponse = BlogData | null
export type GetRecentBlogsResponse = BlogPreview[]
export type GetAllBlogSlugsResponse = BlogSlug[]
export type GetAllPagesResponse = PagePreview[]
export type GetPageBySlugResponse = PageData | null
export type GetPagesByTypeResponse = PagePreview[]
export type GetAllPageSlugsResponse = PageSlug[]

// Category response types
export type GetAllCategoriesResponse = CategoryPreview[]
export type GetCategoryBySlugResponse = CategoryData | null
export type GetAllCategorySlugsResponse = CategorySlug[]
