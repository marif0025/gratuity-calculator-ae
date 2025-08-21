
import { defineField, defineType } from 'sanity'

export default defineType({
    title: 'Image',
    name: 'iimage',
    type: 'image',
    description: 'An extended image type with alt text for accessibility and SEO',
    options: {
        hotspot: true,
    },
    fields: [
        defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
            description: 'Remember to use alt text for people to be able to read what is happening in the image if they are using a screen reader, it\'s also important for SEO',
        })
    ]
})
