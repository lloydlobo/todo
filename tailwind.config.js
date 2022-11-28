/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            content: {
                link: 'url("/icons/link.svg")',
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
