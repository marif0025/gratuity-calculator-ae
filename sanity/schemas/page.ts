import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    description: 'Single pages like contact, privacy policy, terms of service, etc.',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The main title of the page',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description of the page (used for SEO and previews)',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'URL-friendly identifier for the page (auto-generated from title)',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent',
            description: 'The main content of the page with rich text formatting',
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seo',
            description: 'Search engine optimization settings for this page',
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            description: 'Whether this page is published and visible to the public',
            initialValue: false,
        }),
        defineField({
            name: 'pageType',
            title: 'Page Type',
            type: 'string',
            description: 'Type of page (e.g., contact, privacy, terms, about)',
            options: {
                list: [
                    { title: 'Contact', value: 'contact' },
                    { title: 'Privacy Policy', value: 'privacy' },
                    { title: 'Terms of Service', value: 'terms' },
                    { title: 'About Us', value: 'about' },
                    { title: 'FAQ', value: 'faq' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
            pageType: 'pageType',
            isPublished: 'isPublished',
        },
        prepare(selection) {
            const { title, description, pageType, isPublished } = selection
            return {
                title: title || 'Untitled Page',
                subtitle: `${pageType || 'Unknown'} • ${isPublished ? 'Published' : 'Draft'}`,
                description: description,
            }
        },
    },
    orderings: [
        {
            title: 'Page Type, A-Z',
            name: 'pageTypeAsc',
            by: [
                { field: 'pageType', direction: 'asc' },
                { field: 'title', direction: 'asc' },
            ],
        },
        {
            title: 'Title, A-Z',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
        {
            title: 'Published Status',
            name: 'publishedStatus',
            by: [
                { field: 'isPublished', direction: 'desc' },
                { field: 'title', direction: 'asc' },
            ],
        },
    ],
})
