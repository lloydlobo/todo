/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

// https://github.com/fireship-io/fireship.io/blob/master/tailwind.config.cjs
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    // #root: true,
    darkMode: "class",
    theme: {
        fontFamily: {
            sans: ["PT_Sans", "sans"],
            display: ["Nunito", "PT Sans Caption", "Figtree", "sans-serif"],
            body: ["Inter", "sans-serif"],
            code: ["Roboto Mono", "sans-serif"],
        },
        colors: {
            transparant: "transparent",
            current: "currentColor",
            white: "#ffffff",
            black: "#000000",
            gray1: "#f8f8f8",
            gray2: "#dbe1e8",
            gray3: "#b2becd",
            gray4: "#6c7983",
            gray5: "#454e56",
            gray6: "#2a2e35",
            gray7: "#12181b",
            link: "#0000ee",
            blue: colors.blue,
            green: colors.green,
            pink: colors.pink,
            purple: colors.purple,
            orange: colors.orange,
            red: colors.red,
            yellow: colors.yellow,
        },
        extend: {
            // content: { link: 'url("/icons/link.svg")' },
            boxShadow: {
                "3xl": "0 5px 20px rgb(0 0 0 / 30%)",
                "4xl": "0 5px 20px rgb(0 0 0 / 90%)",
            },
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            "font-weight": "normal",
                            "font-size": "2.5rem",
                        },
                        h2: {
                            "font-weight": "normal",
                            "font-size": "2rem",
                        },
                        h3: {
                            "font-weight": "normal",
                            "font-size": "1.75rem",
                        },
                        h4: {
                            "font-weight": "normal",
                            "font-size": "1.5rem",
                        },
                        h5: {
                            "font-weight": "normal",
                            "font-size": "1.25rem",
                        },
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

// https://github.com/mui/material-ui/tree/master/examples/tailwind-css
// use Tailwind CSS ... together with MUI. It includes @mui/material and its
// peer dependencies, including emotion, the default style engine in MUI v5.
