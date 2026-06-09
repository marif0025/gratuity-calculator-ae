import { defineType, defineField } from 'sanity'
import { Calculator } from 'lucide-react'

export default defineType({
  name: 'heroCalculator',
  title: 'Hero Calculator',
  type: 'object',
  description: 'Title and description shown above the gratuity calculator form in the hero',
  icon: Calculator,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Heading displayed above the calculator form',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Supporting text displayed below the calculator heading',
      type: 'text',
      rows: 2,
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
        title: title || 'Calculator',
        subtitle: description,
      }
    },
  },
})
