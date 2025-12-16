/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Academic Palette (Stone & Slate)
                'bg': '#fafaf9',      // Stone 50
                'bg-alt': '#f5f5f4',  // Stone 100
                'surface': '#ffffff',

                // Typography
                'text': '#0f172a',           // Slate 900
                'text-secondary': '#475569', // Slate 600
                'text-muted': '#94a3b8',     // Slate 400

                // Primary Action
                'primary': '#0f172a',        // Slate 900
                'primary-dark': '#1e293b',   // Slate 800

                // Accent (Gold/Bronze)
                'accent': '#0f172a',         // Keep dark for light mode text
                'accent-hover': '#1e293b',
                'accent-gold': '#d97706',    // Amber 600 (Dark mode accent)
            },
            fontFamily: {
                'heading': ['Crimson Text', 'Georgia', 'serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'hero-lg': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
                'section': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'subsection': ['1.5rem', { lineHeight: '1.3' }],
            },
            spacing: {
                'section': '6rem',
                'section-lg': '8rem',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'card': '0 4px 12px rgba(0, 0, 0, 0.03)',
            },
            borderRadius: {
                'btn': '0.375rem',  // 6px (Sharper)
                'card': '0.5rem',   // 8px (Sharper)
            },
        },
    },
    plugins: [],
};
