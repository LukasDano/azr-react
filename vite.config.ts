import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

// biome-ignore lint/style/noDefaultExport: Vite config requires default export
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
        sourcemap: false,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        watch: false,
        include: ['test/**/*.{test,spec}.{js,ts,tsx}'],
        setupFiles: ['/test/setupTests.ts'],
    },
});
