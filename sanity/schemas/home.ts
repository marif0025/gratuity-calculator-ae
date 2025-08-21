import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    description: 'Main homepage content including hero section and SEO settings',
    // Make this a singleton by using preview and restricting actions
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
        }),
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'hero',
            description: 'The main hero section that appears at the top of the homepage',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            description: 'Search engine optimization settings for the homepage',
        }),
    ],
}) 