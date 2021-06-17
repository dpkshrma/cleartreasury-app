const defaultTheme = require("tailwindcss/defaultTheme");

// TODO: Abstract into a shared design system config somehow
module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      // Needed for dynamically generated CardPanel column class
      safelist: [/\w{2}:grid-cols-\d/],
    },
  },
  /* TODO: Abstract the theming somehow so we can move components to a shared design system */
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      error: "#D75055",
      disabled: "#C5C5C5",

      transparent: "transparent",
      black: "#191919",
      white: "#ffffff",

      email: "#777777",
      facebook: "#3B5998",
      twitter: "#55ACEE",
      linkedin: "#0077B5",

      gray: {
        50: "#FBFBFB",
        100: "#F7F7F7",
        200: "#E9E9E9",
        300: "#D4D4D4",
        400: "#A8A8A8",
        500: "#6B6B6B",
        600: "#515151",
        700: "#353535",
        800: "#252525",
        900: "#191919",
      },

      sand: {
        50: "#fdfcf9",
        100: "#FBF8F2",
        200: "#F9F1DE",
        300: "#F1E5C9",
        400: "#E0CEA9",
        500: "#CFBA90",
        600: "#C2AC80",
        700: "#7D664A",
        800: "#504235",
        900: "#1C1917",
      },

      jade: {
        50: "#F3FAF8",
        100: "#EAf7f4",
        200: "#A8DBDB",
        300: "#6BB8B8",
        400: "#159C9C",
        500: "#028686",
        600: "#007373",
        700: "#006161",
        800: "#004747",
        900: "#002E2E",
      },

      ruby: {
        50: "#FDF0F0",
        100: "#FBE4E4",
        200: "#F8CECE",
        300: "#F3AFAF",
        400: "#EF9A9A",
        500: "#EA8585",
        600: "#E17171",
        700: "#D75055",
        800: "#C93B47",
        900: "#942935",
      },

      sapphire: {
        50: "#F4F7FE",
        100: "#E7F0FF",
        200: "#BED5FF",
        300: "#96B7F5",
        400: "#78A1ED",
        500: "#5D8EE7",
        600: "#527FD9",
        700: "#396BD0",
        800: "#3158B9",
        900: "#253E83",
      },

      green: {
        50: "#F3FCFA",
        100: "#E6FAF6",
        200: "#CCF6EC",
        300: "#99ECDA",
        400: "#67E3C7",
        500: "#33D9B5",
        600: "#01D0A2",
        700: "#01A682",
        800: "#017D61",
        900: "#005341",
      },

      purple: {
        50: "#F9F5FC",
        100: "#F3EBFA",
        200: "#E7D7F6",
        300: "#CFAEEE",
        400: "#B886E5",
        500: "#A05DDD",
        600: "#8835D4",
        700: "#6D29AA",
        800: "#521F7F",
        900: "#361555",
      },

      yellow: {
        50: "#FFFDF5",
        100: "#FFFAE6",
        200: "#FFF5CC",
        300: "#FFEB99",
        400: "#FFE266",
        500: "#FFD832",
        600: "#FFCE00",
        700: "#E8AF05",
        800: "#CB9701",
        900: "#B17400",
      },

      red: {
        50: "#FFFBF9",
        100: "#FFF1EC",
        200: "#FFE3D9",
        300: "#FFC7B2",
        400: "#FFAB8C",
        500: "#FF8F65",
        600: "#FF733F",
        700: "#CC5C31",
        800: "#984526",
        900: "#662E19",
      },

      teal: {
        50: "#F3FAFB",
        100: "#E4F1F6",
        200: "#A1C8D9",
        300: "#43829D",
        400: "#10617F",
        500: "#0F4C67",
        600: "#0C3B50",
        700: "#093244",
        800: "#082935",
        900: "#04151B",
      },

      navy: {
        50: "#fcfcfc",
        100: "#F7F7F7",
        200: "#E9E8EE",
        300: "#D3D2DD",
        400: "#A8A5BA",
        500: "#514A75",
        600: "#251D53",
        700: "#1E1742",
        800: "#1B0A33",
        900: "#0F0B21",
      },
    },
    extend: {
      fontSize: {
        "7xl": "6.25rem",
      },
      fontFamily: {
        sans: ["sofia-pro", ...defaultTheme.fontFamily.sans],
        serif: ["freight-text-pro", ...defaultTheme.fontFamily.serif],
      },
      letterSpacing: {
        "extra-wide": "0.2em",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "300",
            },
            h2: {
              fontWeight: "300",
            },
            h3: {
              fontWeight: "300",
            },
          },
        },
        cta: {
          css: [
            {
              h3: {
                fontSize: "1.875rem",
                lineHeight: "2.25rem",
                margin: "0px",
              },
              a: {
                textDecoration: "none",
                color: "inherit",
              },
              img: {
                margin: "0px",
              },
            },
          ],
        },
        "cta-lg": {
          css: [
            {
              h3: {
                fontSize: "2.25rem",
                lineHeight: "2.5rem",
                margin: "0px",
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    backgroundColor: ["hover", "responsive", "even"],
    borderColor: ["hover", "active", "focus"],
    display: ["group-hover", "responsive"],
    flexDirection: ["responsive", "even"],
    opacity: ["group-hover", "responsive", "hover", "focus"],
    textColor: ["group-hover", "responsive", "hover", "focus", "active"],
    textDecoration: ["hover", "active", "focus"],
    visibility: ["group-hover", "responsive"],
    placeholderColor: ["hover", "focus"],
    padding: ["hover", "focus", "responsive"],
    cursor: ["hover", "focus"],
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
