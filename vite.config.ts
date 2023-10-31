import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'
import path from 'node:path'

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

function switchOutDir() {
  if (process.env.TARGET === 'firefox') return './firefox-dist'
  else return './dist'
}

export default defineConfig({
  plugins: [
    react(),

    webExtension({
      manifest: generateManifest,
      browser: process.env.TARGET || 'chrome',
    }),
  ],

  build: {
    outDir: switchOutDir(),
  },

  resolve: {
    alias: {
      '/@react-refresh': path.resolve(
        'node_modules/@vitejs/plugin-react-swc/refresh-runtime.js',
      ),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
