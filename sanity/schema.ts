import { type SchemaTypeDefinition } from "sanity";

import { image, blockContent, seo } from './schemas/components'
import config, { footer, header, siteSeo, logo, link } from "./schemas/config";

const components = [image, blockContent, seo]
const configSchemas = [config, footer, header, siteSeo, logo, link];

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [...components, ...configSchemas],
};
