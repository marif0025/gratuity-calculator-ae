// Export all GROQ queries
export { getHomeQuery } from './home'
export { getConfigQuery } from './config'
export {
    getAllBlogsQuery,
    getBlogBySlugQuery,
    getRecentBlogsQuery,
    getAllBlogSlugsQuery
} from './blog'
export {
    getAllPagesQuery,
    getPageBySlugQuery,
    getPagesByTypeQuery,
    getAllPageSlugsQuery
} from './page'
export {
    getAllCategoriesQuery,
    getCategoryBySlugQuery,
    getAllCategorySlugsQuery,
    getBlogsByCategoryQuery
} from './category'
