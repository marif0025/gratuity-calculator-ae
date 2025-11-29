'use server'

import { cachedFetch } from '../lib/client'
import { getConfigQuery } from '../queries/config'
import type { GetConfigResponse } from '../lib/types'

/**
 * Server action to fetch site configuration data
 * @returns Promise<GetConfigResponse> - Site configuration data or null if not found
 */
export async function getConfig(): Promise<GetConfigResponse> {
    try {
        const data = await cachedFetch<GetConfigResponse>({
            query: getConfigQuery,
            tags: ['config'],
        })
        return data
    } catch (error) {
        console.error('Error fetching config data:', error)
        return null
    }
}
