'use server'

import { sanityFetch } from '../lib/client'
import {
    getAllBlogsQuery,
    getBlogBySlugQuery,
    getRecentBlogsQuery,
    getAllBlogSlugsQuery
} from '../queries/blog'
import type {
    GetAllBlogsResponse,
    GetBlogBySlugResponse,
    GetRecentBlogsResponse,
    GetAllBlogSlugsResponse
} from '../lib/types'

/**
 * Server action to fetch all published blog posts
 * @returns Promise<GetAllBlogsResponse> - Array of blog previews
 */
export async function getAllBlogs(): Promise<GetAllBlogsResponse> {
    try {
        const data = await sanityFetch<typeof getAllBlogsQuery>({
            query: getAllBlogsQuery,
            tags: ['blog'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching all blogs:', error)
        return []
    }
}

/**
 * Server action to fetch a single blog post by slug
 * @param slug - The blog post slug
 * @returns Promise<GetBlogBySlugResponse> - Blog data or null if not found
 */
export async function getBlogBySlug(slug: string): Promise<GetBlogBySlugResponse> {
    try {
        const data = await sanityFetch<typeof getBlogBySlugQuery>({
            query: getBlogBySlugQuery,
            params: { slug },
            tags: ['blog', `blog-${slug}`],
        })
        return data
    } catch (error) {
        console.error('Error fetching blog by slug:', error)
        return null
    }
}

/**
 * Server action to fetch recent blog posts
 * @param limit - Number of recent posts to fetch (default: 3)
 * @returns Promise<GetRecentBlogsResponse> - Array of recent blog previews
 */
export async function getRecentBlogs(limit: number = 3): Promise<GetRecentBlogsResponse> {
    try {
        const data = await sanityFetch<typeof getRecentBlogsQuery>({
            query: getRecentBlogsQuery,
            params: { limit },
            tags: ['blog'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching recent blogs:', error)
        return []
    }
}

/**
 * Server action to fetch all blog post slugs for static generation
 * @returns Promise<GetAllBlogSlugsResponse> - Array of blog slugs
 */
export async function getAllBlogSlugs(): Promise<GetAllBlogSlugsResponse> {
    try {
        const data = await sanityFetch<typeof getAllBlogSlugsQuery>({
            query: getAllBlogSlugsQuery,
            tags: ['blog'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching blog slugs:', error)
        return []
    }
}
