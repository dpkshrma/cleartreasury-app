const tokens = require("design-system/build/js/_variables");

module.exports = {
  color: {
    "theme-color-primary": tokens.color.teal[600],
    "theme-color-secondary": tokens.color.gray[200],
    "theme-color-background": tokens.color.gray[100],
    "theme-color-surface": tokens.color.white,

    "theme-color-error": tokens.color.green[600],
    "theme-color-positive": tokens.color.green[600],
    "theme-color-caution": tokens.color.yellow[600],
    "theme-color-critical": tokens.color.red[600],

    "theme-color-on-primary": tokens.color.white,
    "theme-color-on-secondary": tokens.color.black,
    "theme-color-on-background": tokens.color.black,
    "theme-color-on-surface": tokens.color.black,

    "theme-button-primary": tokens.color.green[600],
    "theme-button-primary-hover": tokens.color.gray[800],
    "theme-button-primary-visited": tokens.color.gray[500],
    "theme-button-primary-active": tokens.color.gray[400],

    "theme-button-secondary": tokens.color.gray[200],
    "theme-button-secondary-hover": tokens.color.gray[300],
    "theme-button-secondary-visited": tokens.color.gray[400],
    "theme-button-secondary-active": tokens.color.gray[500],
  },
  borderRadius: {
    "theme-radius": "0.125rem",
  },
};
