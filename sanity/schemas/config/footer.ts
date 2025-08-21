import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer Settings',
    type: 'object',
    description: 'Site footer configuration including text, menu items, and social links',
    fields: [
        defineField({
            name: 'footer_text',
            title: 'Footer Text',
            type: 'text',
            description: 'Text that appears in the footer (e.g., copyright notice, company info)',
        }),
        defineField({
            name: 'menu',
            title: 'Menu Items',
            type: 'array',
            description: 'Footer navigation menu items',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'social_links',
            title: 'Social Links',
            type: 'array',
            description: 'Social media links for the footer',
            of: [{ type: 'link' }],
        }),
    ],
})
