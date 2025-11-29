'use server'

import { sanityFetch } from '../lib/client'
import {
    getAllCategoriesQuery,
    getCategoryBySlugQuery,
    getAllCategorySlugsQuery,
    getBlogsByCategoryQuery
} from '../queries/category'
import type {
    GetAllCategoriesResponse,
    GetCategoryBySlugResponse,
    GetAllCategorySlugsResponse,
    GetBlogsByCategoryResponse
} from '../lib/types'

/**
 * Get all categories
 * @returns Array of category previews
 */
export async function getAllCategories(): Promise<GetAllCategoriesResponse> {
    try {
        const data = await sanityFetch<typeof getAllCategoriesQuery>({
            query: getAllCategoriesQuery,
            tags: ['category'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching all categories:', error)
        return []
    }
}

/**
 * Get category by slug
 * @param slug - Category slug
 * @returns Category data or null
 */
export async function getCategoryBySlug(slug: string): Promise<GetCategoryBySlugResponse> {
    try {
        const data = await sanityFetch<typeof getCategoryBySlugQuery>({
            query: getCategoryBySlugQuery,
            params: { slug },
            tags: ['category', `category-${slug}`],
        })
        return data
    } catch (error) {
        console.error('Error fetching category by slug:', error)
        return null
    }
}

/**
 * Get all category slugs for static generation
 * @returns Array of category slugs
 */
export async function getAllCategorySlugs(): Promise<GetAllCategorySlugsResponse> {
    try {
        const data = await sanityFetch<typeof getAllCategorySlugsQuery>({
            query: getAllCategorySlugsQuery,
            tags: ['category'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching category slugs:', error)
        return []
    }
}

/**
 * Get blogs by category slug
 * @param categorySlug - Category slug
 * @returns Array of blog previews in the category
 */
export async function getBlogsByCategory(categorySlug: string): Promise<GetBlogsByCategoryResponse> {
    try {
        const data = await sanityFetch<typeof getBlogsByCategoryQuery>({
            query: getBlogsByCategoryQuery,
            params: { categorySlug },
            tags: ['category', 'blog'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching blogs by category:', error)
        return []
    }
}
