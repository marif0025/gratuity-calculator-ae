import slugify from "slugify";

/**
 * Creates a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function createSlug(text: string): string {
    return slugify(text, { lower: true, strict: true });
}
