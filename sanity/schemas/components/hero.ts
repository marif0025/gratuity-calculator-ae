import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'object',
    description: 'The main hero section that appears at the top of the page with headline, value propositions, and call-to-action buttons',
    fields: [
        defineField({
            name: 'eyebrow',
            title: 'Eyebrow',
            description: 'The smaller text that sits above the title to provide context (e.g., MOHRE-Certified • 100% Free • Instant Results)',
            type: 'string',
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            description: 'The large text that is the primary focus of the hero section (e.g., Calculate Your UAE Gratuity Benefits)',
            type: 'string',
        }),
        defineField({
            name: 'subheadline',
            title: 'Subheadline',
            description: 'Short supporting text under the headline that provides additional context or explanation',
            type: 'string',
        }),
        defineField({
            name: 'valueProps',
            title: 'Value Propositions',
            type: 'array',
            description: 'List of value proposition cards that highlight key benefits (e.g., Instant Results, 100% Accurate, etc.)',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'valueProposition',
                    title: 'Value Proposition',
                    fields: [
                        defineField({
                            name: 'icon',
                            type: 'string',
                            title: 'Icon (lucide name)',
                            description: 'Name of Lucide icon (e.g., Zap, Calculator, Users, Building)'
                        }),
                        defineField({
                            name: 'title',
                            type: 'string',
                            title: 'Title',
                            description: 'Title for the value prop card'
                        }),
                        defineField({
                            name: 'description',
                            type: 'string',
                            title: 'Description',
                            description: 'Short description for the value prop card'
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'buttons',
            title: 'Call To Actions',
            type: 'array',
            description: 'Add buttons here, the website will handle the styling (e.g., Calculate Now, Learn How It Works)',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'button',
                    title: 'Button',
                    fields: [
                        defineField({
                            name: 'label',
                            type: 'string',
                            title: 'Label',
                            description: 'Button text'
                        }),
                        defineField({
                            name: 'link',
                            type: 'string',
                            title: 'Link',
                            description: 'URL or anchor to scroll to'
                        }),
                        defineField({
                            name: 'variant',
                            type: 'string',
                            title: 'Variant',
                            description: 'Button style variant (e.g., primary, outline, etc.)'
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'trustIndicators',
            title: 'Trust Indicators',
            type: 'array',
            description: 'Short trust-building statements that increase credibility (e.g., Used by 50,000+ employees)',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'trustIndicator',
                    title: 'Trust Indicator',
                    fields: [
                        defineField({
                            name: 'icon',
                            type: 'string',
                            title: 'Icon (lucide name)',
                            description: 'Name of Lucide icon (e.g., CheckCircle)'
                        }),
                        defineField({
                            name: 'text',
                            type: 'string',
                            title: 'Text',
                            description: 'Trust indicator text'
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'iimage',
            description: 'Main image or illustration for the hero section',
        }),
        defineField({
            name: 'stats',
            title: 'Stats Cards',
            type: 'array',
            description: 'Small cards showing key statistics (e.g., 2025 - Latest UAE Law, 7 - All Emirates)',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'stat',
                    title: 'Stat',
                    fields: [
                        defineField({
                            name: 'value',
                            type: 'string',
                            title: 'Value',
                            description: 'Stat value (e.g., 2025, 7)'
                        }),
                        defineField({
                            name: 'label',
                            type: 'string',
                            title: 'Label',
                            description: 'Stat label (e.g., Latest UAE Law, All Emirates)'
                        }),
                    ],
                }),
            ],
        }),
    ],
}) 