import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'seo',
    title: 'SEO Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'meta_title',
            title: 'Meta Title',
            type: 'string',
            description: 'This will be used as the meta title on the page.',
        }),
        defineField({
            name: 'meta_description',
            title: 'Meta Description',
            type: 'text',
            description: 'This will be used as the meta description on the page.',
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'text',
            description: 'Comma-separated list of keywords',
        }),
        defineField({
            name: 'open_graph_image',
            title: 'Open Graph Image',
            type: 'iimage',
            description: 'This will be used as the open graph image on the page.',
        }),
        defineField({
            name: 'indexable',
            title: 'Indexable',
            type: 'boolean',
            description: 'Allow search engines to index this site.',
        }),
    ],
})
