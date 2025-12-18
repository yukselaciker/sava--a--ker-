import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            renderLegacyChunks: true,
            polyfills: true,
        })
    ],
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        // Mobile optimization: Inline small assets to reduce HTTP requests
        assetsInlineLimit: 10000, // 10KB - reduce requests on mobile
        rollupOptions: {
            output: {
                // Manual chunking to prevent massive files on slow networks
                manualChunks: {
                    'vendor': ['./src/testimonials.js'],
                    'test': ['./src/math-test.js', './src/test-questions.js']
                }
            }
        }
    },
    server: {
        port: 5173,
        open: true,
    },
});
