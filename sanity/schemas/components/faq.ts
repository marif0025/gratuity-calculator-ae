import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'object',
    description: 'A frequently asked question with its answer',
    icon: 'help-circle',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            description: 'The frequently asked question',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'blockContent',
            description: 'The answer to the frequently asked question (supports rich text formatting)',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'question',
            answer: 'answer',
        },
        prepare(selection) {
            const { title, answer } = selection

            // Extract plain text from blockContent
            const extractText = (blocks: any[]): string => {
                if (!blocks || !Array.isArray(blocks)) return ''
                return blocks
                    .map(block => {
                        if (block._type === 'block') {
                            return block.children
                                ?.map((child: any) => child.text || '')
                                .join('') || ''
                        }
                        return ''
                    })
                    .join(' ')
                    .trim()
            }

            const answerText = extractText(answer)

            return {
                title: title || 'Untitled FAQ',
                subtitle: answerText ? (answerText.length > 50 ? `${answerText.substring(0, 50)}...` : answerText) : 'No answer provided',
            }
        },
    },
})
