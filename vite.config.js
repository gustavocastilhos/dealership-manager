import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'play_store_512.png',
        'carro-icon.png',
      ],
      manifest: {
        name: 'Auto-Gestão - Controle de Estoque',
        short_name: 'Auto-Gestão',
        description: 'Aplicativo para gestão de estoque e loja de veículos',
        theme_color: '#285088',
        background_color: '#f7f7f7',
        display: 'standalone',
        icons: [
          {
            src: '/carro-icon.png',
            sizes: '192x192', // Certifique-se de que esta imagem tenha exatamente 192x192 pixels
            type: 'image/png',
          },
          {
            src: '/play_store_512.png',
            sizes: '512x512', // Ajustado para o tamanho real que o nome do arquivo sugere
            type: 'image/png',
          }
    
        ]
      },
    }),
  ],
});
