import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port : 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
