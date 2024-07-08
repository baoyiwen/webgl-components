import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import Pages from 'vite-plugin-pages';

// 配置 Vite 项目，启用 React 插件，并设置路径别名
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      extensions: ['tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 使用 @ 来作为 ./src 的别名。
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
