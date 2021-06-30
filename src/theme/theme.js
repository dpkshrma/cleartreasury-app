const { color } = require("design-system/src/styles/colors.json");

module.exports = {
  color: {
    "theme-color-primary": color.gray[600],
    "theme-color-secondary": color.gray[200],
    "theme-color-background": color.gray[100],
    "theme-color-surface": color.white,

    "theme-color-error": color.green[600],
    "theme-color-positive": color.green[600],
    "theme-color-caution": color.yellow[600],
    "theme-color-critical": color.red[600],

    "theme-color-on-primary": color.white,
    "theme-color-on-secondary": color.black,
    "theme-color-on-background": color.black,
    "theme-color-on-surface": color.black,

    "theme-button-primary": color.green[600],
    "theme-button-primary-hover": color.gray[800],
    "theme-button-primary-visited": color.gray[500],
    "theme-button-primary-active": color.gray[400],

    "theme-button-secondary": color.gray[200],
    "theme-button-secondary-hover": color.gray[300],
    "theme-button-secondary-visited": color.gray[400],
    "theme-button-secondary-active": color.gray[500],
  },
  borderRadius: {
    "theme-radius": "0.125rem",
  },
};
