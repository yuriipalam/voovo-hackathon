import type { Config } from "tailwindcss";
import { colors } from "./colors";

function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const int = parseInt(hex, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  return `${r}, ${g}, ${b}`;
}

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: Object.fromEntries(
        Object.entries(colors.light).map(([key, value]) => {
          if (typeof value === "object") {
            return [
              key,
              Object.fromEntries(
                Object.entries(value).map(([keyNested]) => {
                  if (keyNested === "DEFAULT") {
                    return [keyNested, `rgba(var(--${key}), <alpha-value>)`];
                  }
                  return [
                    keyNested,
                    `rgba(var(--${key}-${keyNested}), <alpha-value>)`
                  ];
                })
              )
            ];
          } else {
            return [key, `rgba(var(--${key}), <alpha-value>)`];
          }
        })
      ),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-in-out": {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fast-pulse": "fade-in-out 1s ease infinite"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            maxWidth: "100%", // ensures full width

            h1: {
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.bold"),
              marginBottom: theme("spacing.4")
            },
            h2: {
              fontSize: theme("fontSize.xl"),
              fontWeight: theme("fontWeight.bold"),
              marginBottom: theme("spacing.2") // tighter spacing
            },
            h3: {
              fontSize: theme("fontSize.lg"),
              fontWeight: theme("fontWeight.semibold"),
              marginBottom: theme("spacing.2")
            },
            p: {
              marginBottom: theme("spacing.3"),
              lineHeight: theme("lineHeight.relaxed") // slightly increased line height
            },
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "none",
              fontWeight: theme("fontWeight.medium"),
              "&:hover": {
                textDecoration: "underline"
              }
            },
            blockquote: {
              fontStyle: "italic",
              color: theme("colors.gray.500"),
              borderLeftColor: theme("colors.gray.300"),
              borderLeftWidth: "4px",
              paddingLeft: theme("spacing.4"),
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4")
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              color: theme("colors.purple.600"),
              padding: theme("spacing.1"),
              borderRadius: theme("borderRadius.md")
            },
            "pre code": {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.white"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
              display: "block",
              lineHeight: theme("lineHeight.tight")
            },
            ul: {
              marginLeft: theme("spacing.6"),
              listStyleType: "disc",
              marginTop: theme("spacing.2"), // tighter vertical spacing
              marginBottom: theme("spacing.2")
            },
            ol: {
              marginLeft: theme("spacing.6"),
              listStyleType: "decimal"
            },
            "ul li::marker": {
              color: theme("colors.gray.600")
            },
            "ol li::marker": {
              color: theme("colors.gray.600")
            },
            strong: {
              fontWeight: theme("fontWeight.semibold")
            }
          }
        }
      })
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addBase, theme }) {
      addBase(
        Object.fromEntries(
          [":root"].map((theme) => {
            // TODO: add .dark
            // const themeVariable = theme === ":root" ? "light" : "dark";
            const themeVariable = "light";
            return [
              theme,
              Object.fromEntries(
                Object.entries(colors[themeVariable]).flatMap(
                  ([key, value]) => {
                    if (typeof value === "object") {
                      return Object.entries(value).map(
                        ([keyNested, valueNested]) => {
                          if (keyNested === "DEFAULT") {
                            return [`--${key}`, hexToRgb(valueNested)];
                          }
                          return [
                            `--${key}-${keyNested}`,
                            hexToRgb(valueNested)
                          ];
                        }
                      );
                    } else {
                      return [[`--${key}`, hexToRgb(value)]];
                    }
                  }
                )
              )
            ];
          })
        )
      );
    },
    require("@tailwindcss/typography")
  ]
};

export default config;
