import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'footerCoverageArea',
    title: 'Footer Coverage Area',
    type: 'object',
    description: 'A coverage area item displayed in the footer',
    fields: [
        defineField({
            name: 'svg_icon',
            title: 'SVG Icon',
            type: 'text',
            description: 'SVG icon code (optional)',
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
            description: 'Coverage area text',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            text: 'text',
        },
        prepare({ text }) {
            return {
                title: text || 'Untitled Coverage Area',
            }
        },
    },
})
