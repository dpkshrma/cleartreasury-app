const tokens = require("@clear-treasury/design-system/dist/tokens/tailwind/core");

module.exports = {
  color: {
    "theme-color-primary": tokens.colors.teal[600],
    "theme-color-secondary": tokens.colors.gray[200],
    "theme-color-background": tokens.colors.gray[100],
    "theme-color-surface": tokens.colors.white,

    "theme-color-error": tokens.colors.red[600],
    "theme-color-error-background": tokens.colors.red[100],
    "theme-color-positive": tokens.colors.green[600],
    "theme-color-positive-background": tokens.colors.green[100],
    "theme-color-caution": tokens.colors.yellow[600],
    "theme-color-caution-background": tokens.colors.yellow[100],
    "theme-color-critical": tokens.colors.red[600],
    "theme-color-critical-background": tokens.colors.red[100],

    "theme-color-on-primary": tokens.colors.white,
    "theme-color-on-secondary": tokens.colors.black,
    "theme-color-on-background": tokens.colors.black,
    "theme-color-on-surface": tokens.colors.black,

    "theme-button-primary": tokens.colors.green[600],
    "theme-button-primary-hover": tokens.colors.green[800],
    "theme-button-primary-visited": tokens.colors.green[300],
    "theme-button-primary-active": tokens.colors.green[400],

    "theme-button-secondary": tokens.colors.gray[200],
    "theme-button-secondary-hover": tokens.colors.gray[300],
    "theme-button-secondary-visited": tokens.colors.gray[400],
    "theme-button-secondary-active": tokens.colors.gray[500],

    "theme-text-color-primary": tokens.colors.gray[800],
  },
  borderRadius: {
    "theme-radius": "0.125rem",
  },
};
