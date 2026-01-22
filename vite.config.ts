import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/azr-react/',
    server: {
        port: 3807,
        host: 'localhost',
        cors: true,
    },
    preview: {
        allowedHosts: true,
        port: 3707,
        host: 'localhost',
    },
    build: {
        sourcemap: true,
    },
});
