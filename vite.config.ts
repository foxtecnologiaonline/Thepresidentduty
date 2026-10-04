import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos no build: permite hospedar o jogo em qualquer subpasta
  // (ex.: um Artifact ou GitHub Pages) sem quebrar os assets.
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'O CEO: Orange',
        short_name: 'O CEO',
        description: 'Simulador de decisões de um CEO de tecnologia e seus impactos na empresa.',
        theme_color: '#0b1220',
        background_color: '#0b1220',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: './icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
