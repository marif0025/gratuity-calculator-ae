import { defineType, defineField } from 'sanity'
import { table } from '@sanity/table'

export default defineType({
    title: 'Table Block',
    name: 'tableBlock',
    type: 'object',
    description: 'A structured table with rows and columns for displaying tabular data',
    fields: [
        defineField({
            name: 'title',
            title: 'Table Title',
            description: 'Optional title for the table (e.g., "Pricing Comparison", "Feature Matrix")',
            type: 'string',
        }),
        defineField({
            name: 'caption',
            title: 'Table Caption',
            description: 'Optional caption or description for the table',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'table',
            title: 'Table Data',
            description: 'Use the table editor below to create and edit your table',
            type: 'table',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            tableData: 'table',
        },
        prepare({ title, tableData }) {
            const hasData = tableData && tableData.rows && tableData.rows.length > 0
            const rowCount = hasData ? tableData.rows.length : 0
            const columnCount = hasData && tableData.rows[0] ? tableData.rows[0].cells.length : 0

            return {
                title: title || 'Table',
                subtitle: hasData ? `${rowCount} row${rowCount === 1 ? '' : 's'}, ${columnCount} column${columnCount === 1 ? '' : 's'}` : 'Empty table',
            }
        },
    },
})
