import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // or use your specific IP address like '192.168.x.x'
    port: 5173, // Optional: you can change the port if you prefer
  },
})
