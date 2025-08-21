import { defineField, defineType } from 'sanity';

import footer from './footer';
import header from './header';
import siteSeo from './site-seo';
import link from './link';
import logo from './logo';

export default defineType({
    name: 'config',
    title: 'Site Configuration',
    type: 'document',
    description: 'Global site configuration including SEO, header, footer, and branding settings',

    fields: [
        defineField({
            name: 'site_name',
            title: 'Site Name',
            type: 'string',
            description: 'The name of your website that appears in titles and branding',
        }),

        defineField({
            name: 'seo',
            title: 'Site SEO Settings',
            type: 'site_seo',
            description: 'Global SEO configuration for the entire website',
        }),

        defineField({
            name: 'header',
            title: 'Header Settings',
            type: 'header',
            description: 'Header configuration including logo, navigation, and call-to-action',
        }),

        defineField({
            name: 'footer',
            title: 'Footer Settings',
            type: 'footer',
            description: 'Footer configuration including text, menu items, and social links',
        }),
    ],
});

export {
    footer,
    header,
    siteSeo,
    logo,
    link,
}
