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
                'primary': '#0d9488',
                'primary-light': '#14b8a6',
                'primary-dark': '#0f766e',
                'secondary': '#6366f1',
                'surface': '#ffffff',
                'background': '#f8fafc',
                'background-alt': '#f1f5f9',
                'text-primary': '#1e293b',
                'text-secondary': '#64748b',
            },
            fontFamily: {
                'heading': ['Nunito', 'system-ui', 'sans-serif'],
                'body': ['Nunito Sans', 'Nunito', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
