import { type SchemaTypeDefinition } from "sanity";

import { image, blockContent, seo, hero, commonFields } from './schemas/components'
import config, { footer, header, siteSeo, logo, link } from "./schemas/config";
import home from './schemas/home'

const components = [image, blockContent, seo, hero]
const configSchemas = [footer, header, siteSeo, logo, link];
const singletons = [config, home]; // Config and Home are singletons

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [...components, ...configSchemas, ...singletons],
};

export { commonFields }
