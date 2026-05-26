import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/EmilyRl08/Livreando.git', // 👈 ADICIONE ESSA LINHA (mude para o nome real do seu repo)
})