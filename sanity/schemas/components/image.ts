
import { defineType } from 'sanity'

/**
 * This is the schema type for Images
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'image'
 *  }
 */

export default defineType({
    title: 'Image',
    name: 'iimage',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
        }
    ]
})
