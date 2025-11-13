// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://walksantacruz.com',
  trailingSlash: 'never',
  integrations: [
    icon(),
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/'
        }
      ]
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});