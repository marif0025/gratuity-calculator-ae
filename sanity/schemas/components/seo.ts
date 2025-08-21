import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'seo',
    title: 'SEO Settings',
    type: 'object',
    description: 'Search engine optimization settings for this page',
    fields: [
        defineField({
            name: 'meta_title',
            title: 'Meta Title',
            type: 'string',
            description: 'This will be used as the meta title on the page. Keep it under 60 characters for optimal display in search results.',
        }),
        defineField({
            name: 'meta_description',
            title: 'Meta Description',
            type: 'text',
            description: 'This will be used as the meta description on the page. Keep it under 160 characters for optimal display in search results.',
        }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'text',
            description: 'Comma-separated list of keywords relevant to this page content',
        }),
        defineField({
            name: 'open_graph_image',
            title: 'Open Graph Image',
            type: 'iimage',
            description: 'This will be used as the open graph image when this page is shared on social media platforms.',
        }),
        defineField({
            name: 'indexable',
            title: 'Indexable',
            type: 'boolean',
            description: 'Allow search engines to index this page. Set to false for private or draft content.',
            initialValue: true,
        }),
    ],
})
