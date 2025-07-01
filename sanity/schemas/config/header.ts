import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'header',
    title: 'Header Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'logo',
            title: 'Site Logo',
            type: 'logo',
        }),
        defineField({
            name: 'menu',
            title: 'Menu Items',
            type: 'array',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'cta_button',
            title: 'Call to Action Button',
            type: 'link',
        }),
    ],
})
