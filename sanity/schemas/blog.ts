import { defineType, defineField } from 'sanity'
import { titleField, richTextField, imageField } from './components/common-fields'

export default defineType({
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    description: 'Blog post with title, description, content, feature image, and SEO settings',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The main title of the blog post',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description or excerpt of the blog post (used for previews and SEO)',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'URL-friendly identifier for the blog post (auto-generated from title)',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featureImage',
            title: 'Feature Image',
            type: 'iimage',
            description: 'Main image for the blog post (displayed in listings and social media)',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'The category this blog post belongs to',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent',
            description: 'The main content of the blog post with rich text formatting',
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seo',
            description: 'Search engine optimization settings for this blog post',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            description: 'When this blog post was or will be published',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            description: 'Whether this blog post is published and visible to the public',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
            media: 'featureImage',
            publishedAt: 'publishedAt',
            isPublished: 'isPublished',
        },
        prepare(selection) {
            const { title, description, media, publishedAt, isPublished } = selection
            return {
                title: title || 'Untitled Blog Post',
                subtitle: isPublished
                    ? `Published ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unknown'}`
                    : 'Draft',
                description: description,
                media: media,
            }
        },
    },
    orderings: [
        {
            title: 'Publication Date, New',
            name: 'publishedAtDesc',
            by: [
                { field: 'publishedAt', direction: 'desc' },
                { field: 'title', direction: 'asc' },
            ],
        },
        {
            title: 'Publication Date, Old',
            name: 'publishedAtAsc',
            by: [
                { field: 'publishedAt', direction: 'asc' },
                { field: 'title', direction: 'asc' },
            ],
        },
        {
            title: 'Title, A-Z',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})
