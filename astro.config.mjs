// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://signingdayadvisors.com',

  build: { format: 'directory' },

  trailingSlash: 'ignore',

  adapter: cloudflare(),

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/questionnaire') &&
        !page.includes('/terms') &&
        !page.includes('/portal'),
    }),
  ],
});
