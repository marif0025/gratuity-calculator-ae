import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    description: 'A link with text, URL, and external link options',
    fields: [
        defineField({
            name: 'text',
            title: 'Link Text',
            type: 'string',
            description: 'The text that will be displayed as the link',
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'string',
            description: 'The destination URL for this link',
        }),
        defineField({
            name: 'is_external',
            title: 'Open in New Tab',
            type: 'boolean',
            description: 'Should this link open in a new tab? Recommended for external links',
            initialValue: false,
        }),
    ],
})

