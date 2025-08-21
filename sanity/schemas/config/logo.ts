import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'logo',
    title: 'Logo',
    type: 'object',
    description: 'Site logo with image, URL, and alt text',
    fields: [
        defineField({
            name: 'image',
            title: 'Logo Image',
            type: 'iimage',
            description: 'The logo image file',
        }),
        defineField({
            name: 'url',
            title: 'Logo URL',
            type: 'url',
            description: 'URL where clicking the logo should navigate to (usually homepage)',
        }),
        defineField({
            name: 'text',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for the logo image for accessibility',
        }),
    ],
})

