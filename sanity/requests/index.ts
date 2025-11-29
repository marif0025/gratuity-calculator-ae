// Export all request functions
export { getHome } from './home'
export { getConfig } from './config'
export {
    getAllBlogs,
    getBlogBySlug,
    getRecentBlogs,
    getAllBlogSlugs
} from './blog'
export {
    getAllPages,
    getPageBySlug,
    getPagesByType,
    getAllPageSlugs,
    getPageByType
} from './page'
export {
    getAllCategories,
    getCategoryBySlug,
    getAllCategorySlugs,
    getBlogsByCategory
} from './category'

// Export types
export type {
    GetHomeResponse,
    GetConfigResponse,
    GetAllBlogsResponse,
    GetBlogBySlugResponse,
    GetRecentBlogsResponse,
    GetAllBlogSlugsResponse,
    GetAllPagesResponse,
    GetPageBySlugResponse,
    GetPagesByTypeResponse,
    GetAllPageSlugsResponse,
    GetAllCategoriesResponse,
    GetCategoryBySlugResponse,
    GetAllCategorySlugsResponse,
    GetBlogsByCategoryResponse,
    HomeData,
    ConfigData,
    BlogData,
    BlogPreview,
    CategoryData,
    CategoryPreview,
    PageData,
    PagePreview,
    SanityImage,
    SanityLink,
    SanitySEO,
    AlertData,
    FAQData,
    FAQsBlock,
    TableBlockData
} from '../lib/types'

// Re-export SEO helper functions
export {
    transformSEOToMetadata,
    generateBlogMetadata,
    generateCategoryMetadata,
    generatePageMetadata,
    generateHomeMetadata,
    generateConfigMetadata,
} from '../lib/seo-helper'
