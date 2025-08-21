import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'hero',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
    ],
}) 