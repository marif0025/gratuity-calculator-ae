import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'site_seo',
    title: 'Site SEO Settings',
    type: 'object',
    description: 'Global SEO settings for the entire website including meta tags, favicon, and tracking scripts',
    fields: [
        defineField({
            name: 'meta_title',
            title: 'Meta Title',
            type: 'string',
            description: 'Default meta title for the website. Individual pages can override this.',
        }),

        defineField({
            name: 'meta_description',
            title: 'Meta Description',
            type: 'text',
            description: 'Default meta description for the website. Individual pages can override this.',
        }),

        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'iimage',
            description: 'Website favicon that appears in browser tabs and bookmarks',
        }),

        defineField({
            name: 'open_graph_image',
            title: 'Open Graph Image',
            type: 'iimage',
            description: 'Default Open Graph image for social media sharing when pages don\'t have their own',
        }),

        defineField({
            name: 'base_path',
            title: 'Base Path',
            type: 'url',
            description: 'The base URL for the website (e.g., https://example.com)',
        }),

        defineField({
            name: 'sitemap_url',
            title: 'Sitemap URL',
            type: 'url',
            description: 'URL to the website sitemap for search engines',
        }),

        defineField({
            name: 'indexable',
            title: 'Indexable',
            type: 'boolean',
            description: 'Allow search engines to index this site. Set to false for staging or private sites.',
            initialValue: true,
        }),

        defineField({
            name: 'google_tag',
            title: 'Google Search Console Verification',
            type: 'string',
            description: 'Enter the Google Search Console Verification (e.g., XXXXXXXX) for analytics and tracking.',
        }),

        defineField({
            name: 'google_tag_manager_id',
            title: 'Google Tag Manager ID',
            type: 'string',
            description: 'Enter the Google Tag Manager ID (e.g., GTM-XXXXX) for analytics and tracking. If not provided, the Google Search Console Verification will be used.',
        }),

        defineField({
            name: 'scripts',
            title: 'Scripts',
            type: 'array',
            of: [{ type: 'text' }],
            description: 'Add custom scripts for the head section (e.g., analytics, third-party tools)',
        }),
    ],
})
