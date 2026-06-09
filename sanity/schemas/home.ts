import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    description: 'Main homepage content and SEO settings',
    groups: [
        {
            name: 'hero',
            title: 'Hero',
            default: true,
        },
        {
            name: 'content',
            title: 'Content and FAQs',
        },
        {
            name: 'seo',
            title: 'SEO',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Home Page',
            }
        },
    },
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The title of the home page (used internally for organization)',
            initialValue: 'Home Page',
            hidden: true,
        }),
        defineField({
            name: 'hero',
            title: 'Hero',
            type: 'homeHero',
            description: 'Hero section for the homepage',
            group: 'hero',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'homeContent',
            description: 'Main content section for the homepage',
            group: 'content',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'homeFaqs',
            description: 'Frequently asked questions section for the homepage',
            group: 'content',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            description: 'Search engine optimization settings for the homepage',
            group: 'seo',
        }),
    ],
})
