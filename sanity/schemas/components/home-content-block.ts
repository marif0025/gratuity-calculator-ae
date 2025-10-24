import { defineType, defineField } from 'sanity'
import { LayoutGrid } from 'lucide-react'

export default defineType({
    name: 'homeContentBlock',
    title: 'Home Content Block',
    type: 'object',
    description: 'A content block for the home page with title, icon, and rich content',
    icon: LayoutGrid,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The large text that is the primary focus of the block',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            description: 'Icon identifier (e.g., lucide-react icon name)',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            description: 'Rich text content with formatting, links, and embedded images',
            type: 'blockContent',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            icon: 'icon',
        },
        prepare({ title, icon }) {
            return {
                title: title || 'Untitled Block',
                subtitle: icon ? `Icon: ${icon}` : 'No icon',
            }
        },
    },
})
