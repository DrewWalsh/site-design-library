import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'isolated-specimen-entry',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/preview/')) req.url = '/preview.html';
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/preview/')) req.url = '/preview.html';
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: { input: { gallery: resolve('index.html'), preview: resolve('preview.html') } },
  },
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
});
