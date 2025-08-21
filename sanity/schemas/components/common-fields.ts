import { defineField } from 'sanity'

/**
 * Common field templates for reuse across schemas
 * These follow the Sanity schema rules for consistent field definitions
 */

// Eyebrow field template
export const eyebrowField = defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    description: 'The smaller text that sits above the title to provide context',
    type: 'string',
})

// Title field template
export const titleField = defineField({
    name: 'title',
    title: 'Title',
    description: 'The large text that is the primary focus of the block',
    type: 'string',
})

// Heading level toggle field template
export const headingLevelField = defineField({
    name: 'isHeadingOne',
    title: 'Is it a <h1>?',
    type: 'boolean',
    description: 'By default the title is a <h2> tag. If you use this as the top block on the page, you can toggle this on to make it a <h1> instead',
    initialValue: false,
})

// Rich text field template
export const richTextField = defineField({
    name: 'richText',
    title: 'Rich Text',
    description: 'Large body of text that has links, ordered/unordered lists and headings.',
    type: 'blockContent',
})

// Buttons field template
export const buttonsField = defineField({
    name: 'buttons',
    title: 'Buttons',
    description: 'Add buttons here, the website will handle the styling',
    type: 'array',
    of: [{ type: 'link' }],
})

// Image field template
export const imageField = defineField({
    name: 'image',
    title: 'Image',
    type: 'iimage',
    description: 'An image with alt text for accessibility and SEO',
})

// Custom image field with custom name
export const createImageField = (name: string, title: string, description?: string) => defineField({
    name,
    title,
    type: 'iimage',
    description: description || 'An image with alt text for accessibility and SEO',
})
