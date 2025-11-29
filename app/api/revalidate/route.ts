import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Webhook handler for Sanity CMS revalidation
 * This endpoint receives webhook requests from Sanity when content is updated
 * and revalidates the corresponding cache tags
 */
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the webhook body
    const { isValidSignature, body } = await parseBody<{
      _type: string
      _id?: string
      slug?: {
        current?: string
      }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    // Verify the webhook signature
    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Ensure we have a document type
    if (!body?._type) {
      return NextResponse.json(
        { message: 'Bad Request: Missing _type' },
        { status: 400 }
      )
    }

    const documentType = body._type
    const tagsToRevalidate = new Set<string>([documentType, 'config', 'blog'])

    // Add specific document tags based on type and slug
    if (body.slug?.current) {
      const slug = body.slug.current
      tagsToRevalidate.add(`${documentType}-${slug}`)
    }

    // Special handling for content types that affect list caches
    // Blogs: revalidate blog list cache when individual blog changes
    if (documentType === 'blog') {
      tagsToRevalidate.add('blog')
    }

    // Pages: revalidate page list cache when individual page changes
    if (documentType === 'page') {
      tagsToRevalidate.add('page')
    }

    // Categories: revalidate both category and blog caches
    // (since blogs are filtered by category)
    if (documentType === 'category') {
      tagsToRevalidate.add('category')
      tagsToRevalidate.add('blog')
    }

    // Revalidate all relevant tags with 'max' profile for stale-while-revalidate behavior
    const revalidatedTags: string[] = []
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, 'max')
      revalidatedTags.push(tag)
    }

    console.log('Revalidated tags:', revalidatedTags)

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      documentType,
      now: Date.now(),
    })
  } catch (err) {
    console.error('Error revalidating cache:', err)
    return NextResponse.json(
      { message: 'Error revalidating cache', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

