/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        mytheme: {
          primary: "rgb(76,129,210)",
          white: 'rgb(76,129,210)',
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
        },
      },
    ],
  },
};
