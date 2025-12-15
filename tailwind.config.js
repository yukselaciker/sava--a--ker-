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
                // Minimal palette - light mode
                'bg': '#faf9f7',
                'bg-alt': '#f5f4f2',
                'surface': '#ffffff',
                // Minimal palette - dark mode (via CSS)
                'text': '#1a1a1a',
                'text-secondary': '#6b6b6b',
                'text-muted': '#9a9a9a',
                // Primary button color
                'primary': '#2c3e50',        // Deep blue-gray
                'primary-dark': '#1a252f',   // Darker for hover
                // Accent - used sparingly
                'accent': '#2c3e50',        // Same as primary (light mode)
                'accent-hover': '#1a252f',
                'accent-gold': '#c9b896',   // Muted gold (dark mode)
            },
            fontFamily: {
                'heading': ['Playfair Display', 'Georgia', 'serif'],
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
                'btn': '0.5rem',
                'card': '0.75rem',
            },
        },
    },
    plugins: [],
};
