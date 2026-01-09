import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'footerFeature',
    title: 'Footer Feature',
    type: 'object',
    description: 'A feature card displayed in the footer features grid',
    fields: [
        defineField({
            name: 'svg_icon',
            title: 'SVG Icon',
            type: 'text',
            description: 'SVG icon code (optional)',
        }),
        defineField({
            name: 'bgColor',
            title: 'Background Color',
            type: 'string',
            description: 'Select a background color for the feature card (optional)',
            options: {
                list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Orange', value: 'orange' },
                    { title: 'Red', value: 'red' },
                ],
            },
            initialValue: 'blue',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Feature title',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            description: 'Feature description',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            description: 'description',
        },
        prepare({ title, description }) {
            return {
                title: title || 'Untitled Feature',
                subtitle: description,
            }
        },
    },
})
