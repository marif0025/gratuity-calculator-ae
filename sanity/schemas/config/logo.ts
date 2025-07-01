import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'logo',
    title: 'Logo',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Logo Image',
            type: 'iimage',
        }),
        defineField({
            name: 'url',
            title: 'Logo URL',
            type: 'url',
        }),
        defineField({
            name: 'text',
            title: 'Alt Text',
            type: 'string',
        }),
    ],
})

