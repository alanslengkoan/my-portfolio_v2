import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  VitePWA
} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: false,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      includeAssets: ['logo.png', 'apple-touch-icon.png', 'favicon-32x32.png', 'favicon-16x16.png', 'safari-pinned-tab.svg', 'favicon.ico'],
      manifest: {
        name: 'Alan Saputra Lengkoan - Portfolio',
        short_name: 'alanlengkoan',
        description: 'Alan Saputra Lengkoan - Portfolio',
        theme_color: '#1c6343',
        background_color: "#1c6343",
        display: "standalone",
        icons: [{
            src: 'img/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})