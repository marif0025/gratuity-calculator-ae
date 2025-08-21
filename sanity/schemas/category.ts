import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    description: 'Blog post categories for organizing content',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'The name of the category (e.g., "Technology", "Business", "Lifestyle")',
            validation: (Rule) => Rule.required().max(50),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description of what this category covers',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            description: 'URL-friendly identifier for the category',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seo',
            description: 'Search engine optimization settings for this category page',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
        },
        prepare({ title, subtitle }) {
            return {
                title: title || 'Untitled Category',
                subtitle: subtitle || 'No description',
            }
        },
    },
    orderings: [
        {
            title: 'Name A-Z',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
        {
            title: 'Name Z-A',
            name: 'nameDesc',
            by: [{ field: 'name', direction: 'desc' }],
        },
    ],
})
