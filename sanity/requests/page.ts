'use server'

import { cachedFetch } from '../lib/client'
import {
    getAllPagesQuery,
    getPageBySlugQuery,
    getPagesByTypeQuery,
    getAllPageSlugsQuery
} from '../queries/page'
import type {
    GetAllPagesResponse,
    GetPageBySlugResponse,
    GetPagesByTypeResponse,
    GetAllPageSlugsResponse
} from '../lib/types'

/**
 * Server action to fetch all published pages
 * @returns Promise<GetAllPagesResponse> - Array of page previews
 */
export async function getAllPages(): Promise<GetAllPagesResponse> {
    try {
        const data = await cachedFetch<GetAllPagesResponse>({
            query: getAllPagesQuery,
            tags: ['page'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching all pages:', error)
        return []
    }
}

/**
 * Server action to fetch a single page by slug
 * @param slug - The page slug
 * @returns Promise<GetPageBySlugResponse> - Page data or null if not found
 */
export async function getPageBySlug(slug: string): Promise<GetPageBySlugResponse> {
    try {
        const data = await cachedFetch<GetPageBySlugResponse>({
            query: getPageBySlugQuery,
            params: { slug },
            tags: ['page', `page-${slug}`],
        })
        return data
    } catch (error) {
        console.error('Error fetching page by slug:', error)
        return null
    }
}

/**
 * Server action to fetch pages by type
 * @param pageType - The type of pages to fetch (contact, privacy, terms, about, faq, other)
 * @returns Promise<GetPagesByTypeResponse> - Array of page previews
 */
export async function getPagesByType(pageType: string): Promise<GetPagesByTypeResponse> {
    try {
        const data = await cachedFetch<GetPagesByTypeResponse>({
            query: getPagesByTypeQuery,
            params: { pageType },
            tags: ['page'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching pages by type:', error)
        return []
    }
}

/**
 * Server action to fetch all page slugs for static generation
 * @returns Promise<GetAllPageSlugsResponse> - Array of page slugs
 */
export async function getAllPageSlugs(): Promise<GetAllPageSlugsResponse> {
    try {
        const data = await cachedFetch<GetAllPageSlugsResponse>({
            query: getAllPageSlugsQuery,
            tags: ['page'],
        })
        return data || []
    } catch (error) {
        console.error('Error fetching page slugs:', error)
        return []
    }
}

/**
 * Server action to fetch a specific page type (e.g., contact page)
 * @param pageType - The type of page to fetch
 * @returns Promise<GetPageBySlugResponse> - Page data or null if not found
 */
export async function getPageByType(pageType: string): Promise<GetPageBySlugResponse> {
    try {
        const pages = await getPagesByType(pageType)
        return pages.length > 0 ? await getPageBySlug(pages[0].slug.current) : null
    } catch (error) {
        console.error('Error fetching page by type:', error)
        return null
    }
}
