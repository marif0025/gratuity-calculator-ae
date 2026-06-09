import { defineType, defineField, defineArrayMember } from 'sanity'
import { Home } from 'lucide-react'

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export default defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'object',
  description: 'Hero section content for the home page including headline, trust badge, value propositions, and trust indicators',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Main headline HTML. Use <strong> for gradient-highlighted text, e.g. Calculate Your UAE <strong>Gratuity Benefits</strong> in 30 Seconds',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Description HTML below the headline. Use <strong> for emphasized tagline text at the end.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trustBadge',
      title: 'Trust Badge',
      description: 'Badge displayed at the top of the hero section',
      type: 'object',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          description: 'Lucide icon name (e.g. Shield)',
          type: 'string',
        }),
        defineField({
          name: 'text',
          title: 'Text',
          description: 'Badge label text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'valuePropositions',
      title: 'Value Propositions',
      description: 'List of value proposition cards displayed in the hero section',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueProposition',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              description: 'Lucide icon name (e.g. Zap, Calculator, Users, Building)',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              description: 'The main title of the value proposition',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              description: 'The subtitle or supporting text for the value proposition',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'Untitled',
                subtitle: [icon, subtitle].filter(Boolean).join(' · '),
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one value proposition is required'),
    }),
    defineField({
      name: 'trustIndicators',
      title: 'Trust Indicators',
      description: 'List of trust indicator items displayed at the bottom of the hero section',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustIndicator',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              description: 'Lucide icon name (e.g. CheckCircle)',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              description: 'The trust indicator text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              text: 'text',
              icon: 'icon',
            },
            prepare({ text, icon }) {
              return {
                title: text || 'Untitled',
                subtitle: icon ? `Icon: ${icon}` : undefined,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one trust indicator is required'),
    }),
    defineField({
      name: 'calculator',
      title: 'Calculator',
      description: 'Title and description for the calculator card in the hero section',
      type: 'heroCalculator',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ? stripHtml(title) : 'Untitled Hero',
      }
    },
  },
})
