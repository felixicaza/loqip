import { defineConfig } from 'astro/config'

import starlight from '@astrojs/starlight'
import starlightCatppuccin from '@catppuccin/starlight'
import starlightLlmsTxt from 'starlight-llms-txt'
import compressor from 'astro-compressor'

const DEV_URL = 'http://localhost:4321'
const DOMAIN_URL = 'https://loqip.feli.cc'
const SITE = import.meta.env.DEV === true ? DEV_URL : DOMAIN_URL

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['@napi-rs/image', '@napi-rs/image-wasm32-wasi']
    }
  },
  integrations: [
    starlight({
      plugins: [starlightCatppuccin(), starlightLlmsTxt()],
      customCss: ['./src/styles/index.css', './src/styles/playground.css'],
      favicon: '/favicon.png',
      lastUpdated: true,
      title: 'LoQIP',
      logo: {
        src: './src/assets/logo.png',
        alt: 'LoQIP Logo'
      },
      editLink: {
        baseUrl: 'https://github.com/felixicaza/loqip/edit/main/docs/'
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '32x32'
          }
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: String(new URL('/og.png', SITE))
          }
        },
        /**
         * Force Dark mode
         * @see https://github.com/withastro/starlight/discussions/949
         */
        {
          tag: 'script',
          content: 'document.documentElement.setAttribute("data-theme", "dark")'
        }
      ],
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
        Footer: './src/components/starlight/Footer.astro',
        /**
         * Force Dark mode
         * @see https://github.com/withastro/starlight/discussions/949
         */
        ThemeProvider: './src/components/starlight/OverrideThemeMode.astro',
        ThemeSelect: './src/components/starlight/OverrideThemeMode.astro'
      },
      social: [
        {
          icon: 'github',
          label: 'Star on GitHub',
          href: 'https://github.com/felixicaza/loqip'
        }
      ],
      sidebar: [
        {
          label: 'Overview',
          link: '/docs'
        },
        {
          label: 'Getting Started',
          items: [
            'docs/installation',
            'docs/usage'
          ]
        },
        {
          label: 'Guides',
          items: [
            'docs/placeholder',
            'docs/benchmarks',
            'docs/resources'
          ]
        },
        {
          label: 'API Reference',
          link: 'docs/reference'
        }
      ]
    }),
    compressor()
  ]
})
