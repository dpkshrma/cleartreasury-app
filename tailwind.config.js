const designSystem = require("@clear-treasury/design-system/tailwind.config");

const theme = require("./src/theme/theme");

module.exports = {
  ...designSystem,
  theme: {
    ...designSystem.theme,
    extend: {
      ...designSystem.theme.extend,
      colors: theme.color,
      borderRadius: theme.borderRadius,
      keyframes: {
        stroke: {
          to: {
            strokeDashoffset: 0,
          },
        },
        rotate: {
          "100%": {
            transform: "rotate(180deg)",
          },
        },
      },
      animation: {
        stroke: "stroke 20s linear forwards",
        loading: "rotate 4s linear both",
      },
      transitionDelay: {
        4000: "4000ms",
      },
    },
  },
};
