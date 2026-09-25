// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.francorosso.ch',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'it', locales: { it: 'it-CH', en: 'en' } },
      // Pages that carry `noindex` should not be advertised in the sitemap.
      filter: (page) =>
        !['/grazie/', '/thank-you/', '/newsletter-grazie/', '/newsletter-thank-you/', '/privacy/', '/note-legali/', '/legal-notice/'].some((p) =>
          page.endsWith(p),
        ),
    }),
  ],
  image: { responsiveStyles: true },

});
