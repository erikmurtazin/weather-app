import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],

    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-type-checked"],
      prettierConfig, // ← FIX
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      "@eslint-react/no-missing-key": "warn",
      "prettier/prettier": [
        "error",
        { singleQuote: true, jsxSingleQuote: false },
      ],
    },
  },
]);
