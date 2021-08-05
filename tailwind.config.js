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
        fill: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
      },
      animation: {
        stroke: "stroke 20s linear forwards",
        loading: "rotate 10s linear both",
        progress: "fill 20s linear 1",
      },
    },
  },
};
