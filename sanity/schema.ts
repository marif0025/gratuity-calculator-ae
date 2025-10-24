import { type SchemaTypeDefinition } from "sanity";

import { image, blockContent, seo, tableBlock, faq, alert, homeContentBlock, homeContent, homeFaqs, commonFields } from './schemas/components'
import config, { footer, header, siteSeo, logo, link } from "./schemas/config";
import home from './schemas/home'
import blog from './schemas/blog'
import page from './schemas/page'
import category from './schemas/category'

const components = [image, blockContent, seo, tableBlock, faq, alert, homeContentBlock, homeContent, homeFaqs]
const configSchemas = [footer, header, siteSeo, logo, link];
const singletons = [config, home]; // Config and Home are singletons
const documents = [blog, page, category]; // Regular document types

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [...components, ...configSchemas, ...singletons, ...documents],
};

export { commonFields }
