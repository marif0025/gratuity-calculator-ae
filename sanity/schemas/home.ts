import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    description: 'Main homepage content and SEO settings',
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
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            description: 'Search engine optimization settings for the homepage',
        }),
        defineField({
            name: 'contentBlocks',
            title: 'Content Blocks',
            type: 'array',
            description: 'Add multiple content blocks to build your homepage',
            of: [{ type: 'homeContentBlock' }],
        }),
    ],
}) 