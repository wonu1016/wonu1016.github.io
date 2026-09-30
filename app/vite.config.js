import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 배포용 빌드: React / ogl 은 루트 index.html 의 importmap(esm.sh CDN)에서 불러오고,
// 우리 코드만 assets/app.js 하나로 묶습니다. CSS 는 app/src 의 원본을 그대로 씁니다.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'ogl'],
      output: {
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name][extname]',
        banner: '/*! Includes Electric Logo from React Bits (https://reactbits.dev) - Copyright (c) 2026 David Haz - MIT + Commons Clause */'
      }
    }
  }
});
