const designSystem = require("@clear-treasury/design-system/tailwind.config");

const theme = require("./src/theme/theme");

module.exports = {
  ...designSystem,
  theme: {
    ...designSystem.theme,
    extend: { colors: theme.color, borderRadius: theme.borderRadius },
  },
};
