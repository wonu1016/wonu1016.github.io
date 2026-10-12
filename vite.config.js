import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' 라서 저장소 이름이 뭐든 GitHub Pages 하위 경로에서 그대로 동작합니다.
export default defineConfig({ base: './', plugins: [react()] });
