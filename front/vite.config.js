import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api" : {
         target: "htpp://localhost:3005",
         changeOrigin: true,
         secure: false,

      }
    }
  }
})
