import { defineType, defineArrayMember, defineField } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  description: 'Rich text content with formatting, links, and embedded images',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],

      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              defineField({
                title: 'URL',
                name: 'href',
                type: 'url',
                description: 'The URL this text should link to',
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'iimage',
      description: 'Embed an image within the text content',
    }),
    defineArrayMember({
      type: 'tableBlock',
      description: 'Embed a structured table within the text content',
    }),
    defineArrayMember({
      type: 'object',
      name: 'faqs',
      title: 'FAQs',
      description: 'A collection of frequently asked questions and answers',
      fields: [
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          description: 'Add frequently asked questions and their answers',
          of: [{ type: 'faq' }],
        }),
      ],
    }),
    defineArrayMember({
      type: 'alert',
      description: 'Add a beautiful alert component to highlight important information with different severity levels',
    }),
  ],
})
