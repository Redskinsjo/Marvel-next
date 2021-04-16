const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["fantasy"],
      body: ["monospace"],
    },
    extend: {
      keyframes: {
        slide: {
          "0%": {
            right: "0px",
          },
          "100%": {
            right: "2640px",
          },
        },
      },
      animation: {
        slide: "slide linear 30s 1s infinite alternate running",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["group-focus"],
      width: ["hover"],
      animation: ["hover"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".break-word": {
          wordBreak: "break-word",
        },
        ".w-690px": {
          width: "690px",
        },
        ".h-16px": {
          height: "16px",
        },
        ".min-w-90px": {
          minWidth: "90px",
        },
        ".min-w-70px": {
          minWidth: "70px",
        },
        ".mt-chat": {
          marginTop: "5.5px",
        },
        ".w-300px": {
          width: "300px",
        },
        ".h-40px": {
          height: "40px",
        },
        ".h-46px": {
          height: "46px",
        },
        ".min-h-558px": {
          minHeight: "558px",
        },
        ".h-260px": {
          height: "260px",
        },
        ".h-72px": {
          height: "72px",
        },
        ".h-64px": {
          height: "64px",
        },
        ".h-20px": {
          height: "20px",
        },
        ".w-20px": {
          width: "20px",
        },
        ".w-225px": {
          width: "225px",
        },
        ".w-688px": {
          width: "688px",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
