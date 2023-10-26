import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Unfonts from 'unplugin-fonts/vite'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'
import path from 'node:path'

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json')
  const pkg = readJsonFile('package.json')
  return {
    name: pkg.name,
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
    }),
  ],

  resolve: {
    alias: {
      '/@react-refresh': path.resolve(
        'node_modules/@vitejs/plugin-react-swc/refresh-runtime.js'
      ),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
