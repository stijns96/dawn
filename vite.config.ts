import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import shopify from 'vite-plugin-shopify-snapshot'
import pageReload from 'vite-plugin-page-reload'
// import basicSsl from '@vitejs/plugin-basic-ssl'
import { resolve } from 'node:path'

export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@@': resolve('resources/js'),
      '@modules': resolve('frontend/modules')
    }
  },
  plugins: [
    tailwindcss(),
    shopify({
      snippetFile: 'vite.liquid',
      additionalEntrypoints: [
        'frontend/foo.ts', // relative to sourceCodeDir
        'frontend/bar.ts',
        'frontend/modules/**/*.ts',
        'resources/**/*.js' // relative to themeRoot
      ]
    }),
    pageReload('/tmp/theme.update', {
      delay: 2000
    })
    // basicSsl()
  ],
  build: {
    sourcemap: true
  }
})