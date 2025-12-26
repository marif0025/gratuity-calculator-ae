import { defineType, defineField } from 'sanity'
import { Info, AlertTriangle, AlertCircle, Lightbulb } from 'lucide-react'

export default defineType({
  name: 'alert',
  title: 'Alert',
  type: 'object',
  description: 'Beautiful alert component to highlight important information with different severity levels',
  icon: Info,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Choose the type of alert component to display',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Error', value: 'error' },
          { title: 'Tip', value: 'tip' },
          { title: 'Formula', value: 'formula' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Optional title for the alert component',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description: 'The main content of the alert component',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dismissible',
      title: 'Dismissible',
      description: 'Allow users to dismiss this alert component',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      content: 'content',
    },
    prepare({ title, type, content }) {
      const typeLabels = {
        info: 'ℹ️ Info',
        warning: '⚠️ Warning',
        error: '❌ Error',
        tip: '💡 Tip',
      }

      const typeLabel = typeLabels[type as keyof typeof typeLabels] || 'ℹ️ Info'
      const displayTitle = title || 'Untitled Alert'
      const contentPreview = content?.[0]?.children?.[0]?.text || 'No content'

      return {
        title: `${typeLabel}: ${displayTitle}`,
        // subtitle: contentPreview.length > 50 ? `${contentPreview.substring(0, 50)}...` : contentPreview,
      }
    },
  },
})
