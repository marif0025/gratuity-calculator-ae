import { toPlainText, type PortableTextBlock } from "@portabletext/react";
import type { TypedObject } from "sanity";
import { createSlug } from "./slugify";

/**
 * Strips leading numeric characters and any following separators from a slug.
 * Recursively removes leading numbers until a non-numeric character is found.
 * If the result is empty, returns a fallback with "heading-" prefix.
 *
 * @param slug - The slug to process
 * @returns A CSS-safe slug that doesn't start with a number
 *
 * @example
 * ensureNonNumericPrefix("123abc") // "abc"
 * ensureNonNumericPrefix("456-def") // "def"
 * ensureNonNumericPrefix("123-456") // "456"
 * ensureNonNumericPrefix("789") // "heading-789"
 * ensureNonNumericPrefix("abc123") // "abc123"
 */
export function ensureNonNumericPrefix(slug: string): string {
    if (!slug) return "heading-untitled";

    // Recursively strip leading numbers and any following separators
    let cleaned = slug;
    let previousLength = cleaned.length;

    do {
        previousLength = cleaned.length;
        // Strip leading numbers and any following separators (hyphens, underscores)
        cleaned = cleaned.replace(/^[0-9]+[-_]?/, "");
    } while (cleaned.length < previousLength && /^[0-9]/.test(cleaned));

    // If result is empty after stripping, use fallback
    if (!cleaned || cleaned.length === 0) {
        return `heading-${slug}`;
    }

    return cleaned;
}

/**
 * Generates a heading ID from plain text.
 * Converts text to slug and ensures it doesn't start with a number.
 *
 * @param text - The text to convert to a heading ID
 * @returns A CSS-safe heading ID, or undefined if text is empty
 *
 * @example
 * getHeadingIdFromText("123 Introduction") // "introduction"
 * getHeadingIdFromText("Getting Started") // "getting-started"
 * getHeadingIdFromText("456") // "heading-456"
 */
export function getHeadingIdFromText(text: string): string | undefined {
    const trimmed = text.trim();
    if (!trimmed) return undefined;

    const slug = createSlug(trimmed);
    if (!slug) return undefined;

    return ensureNonNumericPrefix(slug);
}

/**
 * Generates a heading ID from a Sanity portable text block/value.
 * Extracts plain text and converts it to a CSS-safe heading ID.
 *
 * @param value - Portable text block or value
 * @returns A CSS-safe heading ID, or undefined if value is empty
 *
 * @example
 * getHeadingId(portableTextBlock) // "introduction"
 */
export function getHeadingId(
    value: TypedObject | PortableTextBlock,
): string | undefined {
    try {
        const text = toPlainText(value as PortableTextBlock).trim();
        if (!text) return undefined;

        return getHeadingIdFromText(text);
    } catch (error) {
        console.error("Error generating heading ID:", error);
        return undefined;
    }
}

/**
 * Gets a DOM element by heading ID.
 * Useful for scrolling to headings or checking if they exist.
 *
 * @param id - The heading ID to search for
 * @returns The HTML element with the matching ID, or null if not found
 *
 * @example
 * const element = getHeadingElementById("introduction");
 * element?.scrollIntoView({ behavior: "smooth" });
 */
export function getHeadingElementById(id: string): HTMLElement | null {
    if (typeof document === "undefined" || !id) return null;

    return document.getElementById(id);
}

/**
 * Generates heading ID data from a portable text block.
 * Returns both the plain text and the generated slug/ID.
 *
 * @param block - Portable text block
 * @returns Object with text and slug, or null if block is invalid
 *
 * @example
 * const data = getHeadingIdFromBlock(block);
 * // { text: "123 Introduction", slug: "introduction" }
 */
export function getHeadingIdFromBlock(
    block: TypedObject | PortableTextBlock,
): { text: string; slug: string } | null {
    try {
        const text = toPlainText(block as PortableTextBlock).trim();
        if (!text) return null;

        const slug = getHeadingIdFromText(text);
        if (!slug) return null;

        return { text, slug };
    } catch (error) {
        console.error("Error generating heading ID from block:", error);
        return null;
    }
}
