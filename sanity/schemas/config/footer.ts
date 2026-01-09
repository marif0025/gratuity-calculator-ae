import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer Settings',
    type: 'object',
    description: 'Site footer configuration including all footer sections and components',
    fields: [
        defineField({
            name: 'top_section',
            title: 'Top Section Content',
            type: 'blockContent',
            description: 'Rich text content for the footer top section',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            description: 'Feature cards displayed in the footer features grid',
            of: [{ type: 'footerFeature' }],
        }),
        defineField({
            name: 'about',
            title: 'About Section',
            type: 'blockContent',
            description: 'About section with title, content, and trusted text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'quick_links',
            title: 'Quick Links',
            type: 'object',
            description: 'Quick links section with title and link items',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    description: 'Title for the quick links section',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    description: 'Quick link items',
                    of: [{ type: 'link' }],
                }),
            ],
        }),
        defineField({
            name: 'coverage_areas',
            title: 'Coverage Areas',
            type: 'object',
            description: 'Coverage areas section with title and area items',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    description: 'Title for the coverage areas section',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'areas',
                    title: 'Areas',
                    type: 'array',
                    description: 'Coverage area items',
                    of: [{ type: 'footerCoverageArea' }],
                }),
            ],
        }),
        defineField({
            name: 'legal_disclaimer',
            title: 'Legal Disclaimer',
            type: 'alert',
            description: 'Legal disclaimer displayed as an alert component',
        }),
        defineField({
            name: 'copyright',
            title: 'Copyright Section',
            type: 'object',
            description: 'Copyright and disclaimer text',
            fields: [
                defineField({
                    name: 'copyright_text',
                    title: 'Copyright Text',
                    type: 'text',
                    description: 'Copyright notice text',
                }),
                defineField({
                    name: 'disclaimer_text',
                    title: 'Disclaimer Text',
                    type: 'text',
                    description: 'Disclaimer text displayed below copyright',
                }),
            ],
        }),
        defineField({
            name: 'legal_links',
            title: 'Legal Links',
            type: 'array',
            description: 'Legal links displayed in the footer bottom (Privacy Policy, Cookies, etc.)',
            of: [{ type: 'link' }],
        }),
    ],
})
