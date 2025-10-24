import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homeFaqs',
    title: 'Home FAQs',
    type: 'object',
    description: 'FAQs section for the home page with title, description, and FAQ list',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Section title for the FAQs',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Brief description of the FAQs section',
            rows: 3,
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            description: 'List of frequently asked questions',
            of: [{ type: 'faq' }],
            validation: (Rule) => Rule.min(1).error('At least one FAQ is required'),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            faqCount: 'faqs.length',
        },
        prepare({ title, faqCount }) {
            return {
                title: title || 'Untitled FAQs',
                subtitle: `${faqCount || 0} FAQ${faqCount !== 1 ? 's' : ''}`,
            }
        },
    },
})
