import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://devfest2027.gdgnantes.com',
  output: 'static',
  outDir: './out',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => page.includes('/fr/') || page.includes('/en/'),
      serialize(item) {
        // Make French the canonical version (strip /fr prefix)
        item.url = item.url.replace(/\/fr\//, '/');
        item.changefreq = 'daily';
        item.priority = 0.7;
        return item;
      },
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
