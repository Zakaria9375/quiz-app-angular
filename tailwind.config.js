/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      mobile: { max: "768px" },
      tablet: { min: "768px" },
      justTablet: { min: "768px", max: "992px" },
      desktop: { min: "992px" },
    },
    extend: {
      colors: {
        "dark-navy": "#313E51",
        navy: "#3B4D66",
        "grey-navy": "#626C7F",

        bluish: "#ABC1E1",
        "light-grey": "#F4F6FA",

        mtx: "rgba(var(--mtx))",
        mbg: "rgba(var(--mbg))",
        sbg: "rgba(var(--sbg))",
        stx: "rgba(var(--stx))",
        shade: "rgba(var(--shade))",

        "my-green": "#26D782",
        "my-red": "#EE5454",
        "my-purple": "#A729F5",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      boxShadow: {
        ninja: "0px 16px 40px 0px rgba(var(--shade)/0.14)",
      },
      minHeight: {
        "ch-m": "calc( 100dvh - 32px )",
        "ch-t": "calc( 100dvh - 56px )",
        "ch-d": "calc( 100dvh - 100px )",
      },
    },
  },
  plugins: [],
};
