import { type SchemaTypeDefinition } from "sanity";

import { image, blockContent, seo, hero } from './schemas/components'
import config, { footer, header, siteSeo, logo, link } from "./schemas/config";
import home from './schemas/home'

const components = [image, blockContent, seo, hero]
const configSchemas = [config, footer, header, siteSeo, logo, link];

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [...components, ...configSchemas, home],
};
