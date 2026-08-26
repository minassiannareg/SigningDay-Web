// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://signingdayadvisors.com',
  // Emits /packages/index.html etc. so every existing URL keeps working.
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // The questionnaire is handed out after a consultation, not indexed.
      filter: (page) => !page.includes('/questionnaire') && !page.includes('/terms'),
    }),
  ],
});
