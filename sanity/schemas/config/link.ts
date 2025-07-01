import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Link Text',
            type: 'string',
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
        }),
        defineField({
            name: 'is_external',
            title: 'Open in New Tab',
            type: 'boolean',
            description: 'Should this link open in a new tab?',
        }),
    ],
})

