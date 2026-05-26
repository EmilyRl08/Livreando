import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Livreando/', // 🌟 Corrigido: Apenas o nome do repositório entre barras
})