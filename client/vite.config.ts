import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
    modulePreload: {
      resolveDependencies: (url, deps, context) => {
        return [];
      },
    },
    rollupOptions: {
      output: {
        sourcemap: false,
        manualChunks: {
          router: ['react-router-dom'],
          rtk: ['@reduxjs/toolkit'],
          redux: ['react-redux'],
        },
      },
    },
  },
})
