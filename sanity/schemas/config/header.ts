import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'header',
    title: 'Header Settings',
    type: 'object',
    description: 'Site header configuration including logo, navigation menu, and call-to-action button',
    fields: [
        defineField({
            name: 'logo',
            title: 'Site Logo',
            type: 'logo',
            description: 'The logo that appears in the header',
        }),
        defineField({
            name: 'menu',
            title: 'Menu Items',
            type: 'array',
            description: 'Navigation menu items for the header',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'cta_button',
            title: 'Call to Action Button',
            type: 'link',
            description: 'Primary call-to-action button in the header (e.g., Get Started, Contact Us)',
        }),
    ],
})
