import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  optimizeDeps: {
    include: ['motion/react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('three')) return 'three';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('swiper')) return 'swiper';
          if (id.includes('framer-motion') || id.includes('/motion/')) return 'motion';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react-vendor';
        },
      },
    },
  },
})
