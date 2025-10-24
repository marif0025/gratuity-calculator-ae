import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homeContent',
    title: 'Home Content',
    type: 'object',
    description: 'Main content section for the home page with title, description, and content blocks',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Main title for the home content section',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Brief description of the home content section',
            rows: 3,
        }),
        defineField({
            name: 'blocks',
            title: 'Content Blocks',
            type: 'array',
            description: 'Add multiple content blocks to build your homepage',
            of: [{ type: 'homeContentBlock' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
        },
        prepare({ title, description }) {
            return {
                title: title || 'Untitled Content',
                subtitle: description || 'No description',
            }
        },
    },
})
