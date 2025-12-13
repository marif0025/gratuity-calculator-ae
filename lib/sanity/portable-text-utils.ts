import { TypedObject } from 'sanity'
import { toPlainText, PortableTextBlock } from '@portabletext/react'

/**
 * Extracts plain text from PortableText blocks
 * @param content - PortableText content (TypedObject or TypedObject[])
 * @returns Plain text string
 */
export function extractPlainTextFromPortableText(
    content: TypedObject | TypedObject[] | undefined | null
): string {
    if (!content) {
        return ''
    }

    try {
        // Cast to PortableTextBlock type expected by toPlainText
        // TypedObject is compatible with PortableTextBlock at runtime
        return toPlainText(content as unknown as PortableTextBlock | PortableTextBlock[])
    } catch (error) {
        console.error('Error extracting plain text from PortableText:', error)
        return ''
    }
}

