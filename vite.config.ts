import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss({ optimize: { minify: true } })],
    base: '/azr-react/',
    server: {
        port: 3807,
        host: 'localhost',
        cors: true
    },
    preview: {
        allowedHosts: true,
        port: 3707,
        host: 'localhost'
    },
    build: {
        sourcemap: true,
        rolldownOptions: {
            output: {
                codeSplitting: {
                    minSize: 100000, // 100KB global minimum chunk size to avoid small artifacts
                    groups: [
                        {
                            name: 'react',
                            test: /node_modules[\\/]react/,
                            priority: 10
                        },
                        {
                            name: 'lib',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10
                        }
                    ]
                }
            }
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        watch: false,
        include: ['test/**/*.{test,spec}.{js,ts,tsx}'],
        setupFiles: ['/test/setupTests.ts']
    }
});
