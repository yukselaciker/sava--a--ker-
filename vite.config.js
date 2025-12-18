import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
    plugins: [
        legacy({
            // Legacy-First: Support older mobile browsers on carrier networks
            targets: ['defaults', 'not IE 11', 'iOS >= 10', 'Android >= 5'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            renderLegacyChunks: true,
            polyfills: true,
            // Force modern browsers to also load legacy for network compatibility
            modernPolyfills: true,
        })
    ],
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        // MTU/Packet Optimization: Inline assets to bypass carrier proxy drops
        assetsInlineLimit: 15000, // 15KB - prevent packet fragmentation on mobile carriers
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
