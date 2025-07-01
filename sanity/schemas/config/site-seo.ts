import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'site_seo',
    title: 'Site SEO Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'meta_title',
            title: 'Meta Title',
            type: 'string',
        }),

        defineField({
            name: 'meta_description',
            title: 'Meta Description',
            type: 'text',
        }),

        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'iimage',
        }),

        defineField({
            name: 'open_graph_image',
            title: 'Open Graph Image',
            type: 'iimage',
        }),

        defineField({
            name: 'base_path',
            title: 'Base Path',
            type: 'url',
        }),

        defineField({
            name: 'sitemap_url',
            title: 'Sitemap URL',
            type: 'url',
        }),

        defineField({
            name: 'indexable',
            title: 'Indexable',
            type: 'boolean',
            description: 'Allow search engines to index this site.',
        }),

        defineField({
            name: 'google_tag',
            title: 'Google Tag Manager ID',
            type: 'string',
            description: 'Enter the Google Tag Manager ID (e.g., GTM-XXXXX).',
        }),

        defineField({
            name: 'scripts',
            title: 'Scripts',
            type: 'array',
            of: [{ type: 'text' }],
            description: 'Add custom scripts for the head section.',
        }),
    ],
})
