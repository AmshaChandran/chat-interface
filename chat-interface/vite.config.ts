import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // Bind to all available network interfaces
    port: 5173,        // Ensure the correct port is used
    strictPort: true,  // Prevent port changes
  },
});
