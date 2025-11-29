
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
});

// Re-export cached fetch utility
export { cachedFetch } from './cache'
export type { CachedFetchOptions } from './cache'
