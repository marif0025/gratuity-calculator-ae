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
    HomeData,
    ConfigData,
    BlogData,
    BlogPreview,
    CategoryData,
    CategoryPreview,
    PageData,
    PagePreview,
    HeroSection,
    SanityImage,
    SanityLink,
    SanitySEO
} from '../lib/types'

// Re-export portable text utilities
export { renderPortableText, getPlainText } from '../lib/portable-text'
