/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0f172a',
                glass: 'rgba(255,255,255,0.06)',
            },
        },
    },
    plugins: [],
}
