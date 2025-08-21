import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            description: 'Main headline for the hero section (e.g., Calculate Your UAE Gratuity Benefits)',
        }),
        defineField({
            name: 'subheadline',
            title: 'Subheadline',
            type: 'string',
            description: 'Short supporting text under the headline.',
        }),
        defineField({
            name: 'badge',
            title: 'Badge',
            type: 'string',
            description: 'Small badge text above the headline (e.g., MOHRE-Certified • 100% Free • Instant Results)',
        }),
        defineField({
            name: 'valueProps',
            title: 'Value Propositions',
            type: 'array',
            description: 'List of value proposition cards (e.g., Instant Results, 100% Accurate, etc.)',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', type: 'string', title: 'Icon (lucide name)', description: 'Name of Lucide icon (e.g., Zap, Calculator, Users, Building)' },
                        { name: 'title', type: 'string', title: 'Title', description: 'Title for the value prop card.' },
                        { name: 'description', type: 'string', title: 'Description', description: 'Short description for the value prop card.' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'ctas',
            title: 'Call To Actions',
            type: 'array',
            description: 'Buttons for the hero section (e.g., Calculate Now, Learn How It Works)',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label', description: 'Button text.' },
                        { name: 'link', type: 'string', title: 'Link', description: 'URL or anchor to scroll to.' },
                        { name: 'variant', type: 'string', title: 'Variant', description: 'Button style variant (e.g., primary, outline, etc.)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'trustIndicators',
            title: 'Trust Indicators',
            type: 'array',
            description: 'Short trust-building statements (e.g., Used by 50,000+ employees)',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', type: 'string', title: 'Icon (lucide name)', description: 'Name of Lucide icon (e.g., CheckCircle)' },
                        { name: 'text', type: 'string', title: 'Text', description: 'Trust indicator text.' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'iimage',
            description: 'Main image or illustration for the hero section.',
        }),
        defineField({
            name: 'stats',
            title: 'Stats Cards',
            type: 'array',
            description: 'Small cards showing stats (e.g., 2025 - Latest UAE Law, 7 - All Emirates)',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', type: 'string', title: 'Value', description: 'Stat value (e.g., 2025, 7)' },
                        { name: 'label', type: 'string', title: 'Label', description: 'Stat label (e.g., Latest UAE Law, All Emirates)' },
                    ],
                },
            ],
        }),
    ],
}) 