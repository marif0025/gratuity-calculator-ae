'use server'

import { client } from '../lib/client'
import { getHomeQuery } from '../queries/home'
import type { GetHomeResponse } from '../lib/types'

/**
 * Server action to fetch home page data
 * @returns Promise<GetHomeResponse> - Home page data or null if not found
 */
export async function getHome(): Promise<GetHomeResponse> {
    try {
        const data = await client.fetch(getHomeQuery)
        return data
    } catch (error) {
        console.error('Error fetching home data:', error)
        return null
    }
}
