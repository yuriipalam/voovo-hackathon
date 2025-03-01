/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint", "react", "prettier", "import"],
  rules: {
    "no-implicit-globals": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "prettier/prettier": "warn"
  },
  ignorePatterns: [
    "node_modules",
    "build",
    "dist",
    "tsconfig.json",
    "postcss.config.js",
    "tailwind.config.ts",
    "prettier.config.js",
    "!**/.server",
    "!**/.client"
  ],
  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      settings: {
        react: {
          version: "detect"
        },
        formComponents: ["Form"],
        linkComponents: [
          {
            name: "Link",
            linkAttribute: "to"
          },
          {
            name: "NavLink",
            linkAttribute: "to"
          }
        ],
        "import/resolver": {
          typescript: {}
        }
      }
    },
    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"]
          },
          typescript: {
            alwaysTryTypes: true
          }
        }
      }
    },
    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true
      }
    }
  ]
};
