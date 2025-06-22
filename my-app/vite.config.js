import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), 
    tailwindcss()],

    server: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:4000', // Your backend server URL
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/v1/, '')
        }
      },
    }
});
