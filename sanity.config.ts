
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["config", "home"])

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) => {
        const schemaTypes = schema.types || [];

        const nonSingletonTypes = schemaTypes.filter(t => t.type === "document").filter(
          (type) => !singletonTypes.has(type.name)
        );

        const singletonItems = Array.from(singletonTypes).map((singletonType) => {
          const schemaType = schemaTypes.find(t => t.name === singletonType);
          return S.listItem()
            .title(schemaType?.title || singletonType)
            .id(singletonType)
            .child(
              S.document()
                .schemaType(singletonType)
                .documentId(singletonType)
            );
        });

        return S.list()
          .title('Content')
          .items([
            ...singletonItems,

            ...(nonSingletonTypes.length > 0 ? [S.divider()] : []),

            ...nonSingletonTypes.map((type) =>
              S.listItem()
                .title(type.title || type.name)
                .id(type.name)
                .child(
                  S.documentTypeList(type.name)
                    .title(type.title || type.name)
                )
            ),
          ])
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
