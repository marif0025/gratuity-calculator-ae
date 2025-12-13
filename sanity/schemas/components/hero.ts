import { defineType, defineField, defineArrayMember } from 'sanity'
import { Home } from 'lucide-react'

export default defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'object',
  description: 'Hero section content for the home page including headline, trust badge, value propositions, and trust indicators',
  icon: Home,
  fields: [
    defineField({
      name: 'headlineTitle',
      title: 'Headline Title',
      description: 'The main title text that appears at the top of the hero section',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineSubtitle',
      title: 'Headline Subtitle',
      description: 'The subtitle text that appears below the main title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineDescription',
      title: 'Headline Description',
      description: 'The main description text that appears below the headline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineHighlightedText',
      title: 'Highlighted Text',
      description: 'The text that appears with a gradient highlight effect in the headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineTagline',
      title: 'Headline Tagline',
      description: 'Additional tagline text that appears after the description',
      type: 'string',
    }),
    defineField({
      name: 'trustBadgeText',
      title: 'Trust Badge Text',
      description: 'The text displayed in the trust badge at the top of the hero section',
      type: 'string',
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
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled',
                subtitle: subtitle || '',
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
      description: 'List of trust indicator texts displayed at the bottom of the hero section',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustIndicator',
          fields: [
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
            },
            prepare({ text }) {
              return {
                title: text || 'Untitled',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one trust indicator is required'),
    }),
  ],
  preview: {
    select: {
      title: 'headlineTitle',
      subtitle: 'headlineSubtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Hero',
        subtitle: subtitle || '',
      }
    },
  },
})
