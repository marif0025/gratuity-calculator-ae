import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'footer_text',
            title: 'Footer Text',
            type: 'text',
        }),
        defineField({
            name: 'menu',
            title: 'Menu Items',
            type: 'array',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'social_links',
            title: 'Social Links',
            type: 'array',
            of: [{ type: 'link' }],
        }),
    ],
})
