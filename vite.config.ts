import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // Only the production build needs the GitHub Pages subpath — keep local
  // dev serving from "/" per the established localhost:8010 workflow.
  base: command === 'build' ? '/fleet-dashboard/' : '/',
  plugins: [react()],
  server: {
    port: 8010,
    strictPort: true,
    host: 'localhost',
  },
}));
