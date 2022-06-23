module.exports = {
  purge: {
    content: ["./**/*.js", "./**/*.11ty.js", "./**/*.html", "./**/*.njk"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      purpleone: "#6947E7",
      purpletwo: "#9D7BE5",
    }),
    extend: {
      fontFamily: {
        leading: ["Darker Grotesque"],
        reading: ["Poppins"],
      },
      colors: {
        darkpurple: "#2e296d",
        midgrey: "#858393",
        purple: "#4C3FE4",
        lightbg: "#F5F5F5",
        mildgrey: "#8D8D8D",
        darkgrey: "#848393",
        midblack: "#251F54",
      },
      spacing: {
        138: "8.62rem",
        90: "5.62rem",
        75: "4.68rem",
        222: "13.9rem",
        68: "4.25rem",
        249: "15.5rem",
      },
      padding: {
        15: "1rem",
        30: "1.5rem",
      },
      inset: {
        "-30": "-8rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
