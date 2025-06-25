// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      __VITE_SPEED_INSIGHTS_ID__: JSON.stringify(env.VITE_VERCEL_SPEED_INSIGHTS_ID),
    },
  };
});
