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

    fields: [
        defineField({
            name: 'site_name',
            title: 'Site Name',
            type: 'string',
        }),

        defineField({
            name: 'seo',
            title: 'Site SEO Settings',
            type: 'site_seo',
        }),

        defineField({
            name: 'header',
            title: 'Header Settings',
            type: 'header',
        }),

        defineField({
            name: 'footer',
            title: 'Footer Settings',
            type: 'footer',
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
