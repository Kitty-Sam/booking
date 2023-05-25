import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@interfaces': path.resolve(__dirname, './src/interfaces'),
            '@store': path.resolve(__dirname, './src/store'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    plugins: [react()],
});
