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
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,json,vue,txt,woff2}']
      },
      includeAssets: ['safari-pinned-tab.svg'],
      manifest: {
        name: 'Alan Saputra Lengkoan - Portfolio',
        short_name: 'alanlengkoan',
        description: 'Alan Saputra Lengkoan - Portfolio',
        theme_color: '#1c6343',
        background_color: "#1c6343",
        display: "standalone",
        icons: [{
            src: 'img/icon/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icon/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})