import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json')
  const pkg = readJsonFile('package.json')

  return {
    name: 'Marktodo',
    auther: pkg.author,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  }
}

export default defineConfig({
  plugins: [
    react(),

    webExtension({
      manifest: generateManifest,
      browser: process.env.TARGET || 'chrome',
    }),
  ],

  resolve: {
    alias: {
      '/@react-refresh': path.resolve(
        'node_modules/@vitejs/plugin-react-swc/refresh-runtime.js',
      ),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
