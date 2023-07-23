/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px'
      },
    },
    extend: {
      colors: {
        'brown': '#352a32',
        'cream': '#fcf8f5',
        'cream-dark': '#988577',
        'petroleum': '#0f4454',
        'petroleum-light': '#2f7387',
        'sky': '#b7cfdc',
        'light-sky': '#d9e4ec',
        'sunset': '#cd4834',
        'sunset-light': '#eb6b59',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
