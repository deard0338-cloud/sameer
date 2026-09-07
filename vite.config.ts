import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'service-image-fallback-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // If request is for a service image in /services/ that doesn't exist on disk, return 404 so <img> onError fires
          if (req.url && req.url.startsWith('/services/') && req.url.match(/\.(png|jpg|jpeg|svg|webp)$/i)) {
            const relativePath = req.url.replace(/^\//, '');
            const filePath = path.join(process.cwd(), 'public', relativePath);
            if (!fs.existsSync(filePath)) {
              res.statusCode = 404;
              res.end('Image Not Found');
              return;
            }
          }
          next();
        });
      }
    }
  ],
});
