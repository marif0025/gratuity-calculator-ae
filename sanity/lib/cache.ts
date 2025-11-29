import { unstable_cache } from 'next/cache'
import type { QueryParams } from 'next-sanity'
import { client } from './client'

/**
 * Options for cached Sanity fetch
 */
export interface CachedFetchOptions {
  /**
   * GROQ query string
   */
  query: string
  /**
   * Query parameters
   */
  params?: QueryParams
  /**
   * Cache tags for tag-based revalidation
   * If provided, cache will persist indefinitely until tag is revalidated
   */
  tags?: string[]
  /**
   * Time-based revalidation in seconds
   * Only used if tags are not provided
   * Set to false to disable time-based revalidation
   */
  revalidate?: number | false
}

/**
 * Cached fetch wrapper for Sanity queries
 * Uses Next.js unstable_cache with tag-based revalidation
 * 
 * @param options - Fetch options including query, params, tags, and revalidate
 * @returns Cached query result
 */
export async function cachedFetch<QueryResponse>(
  options: CachedFetchOptions
): Promise<QueryResponse> {
  const { query, params = {}, tags = [], revalidate = false } = options

  // Create a cache key based on query and params
  const cacheKey = JSON.stringify({ query, params })

  // Use unstable_cache to wrap the fetch
  const cachedFetchFn = unstable_cache(
    async () => {
      return client.fetch<QueryResponse>(query, params)
    },
    [cacheKey, ...tags],
    { tags, revalidate }
  )

  return cachedFetchFn()
}

