import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReactRecommended from "eslint-plugin-react/configs/recommended.js";
import eslintReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginTurbo from "eslint-plugin-turbo";
import tseslintParser from "@typescript-eslint/parser";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginImport from 'eslint-plugin-import';

// TODO move the react plugins out because not all packages use react. We get a warning.
const __dirname = import.meta.dirname;

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  eslintReactRecommended,
  eslintReactJsxRuntime,
  // This needs to in a separate object to be a "global ignore". See https://github.com/eslint/eslint/discussions/17429
  { ignores: ["dist", "dev-dist", "**/*.gen.ts"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      turbo: eslintPluginTurbo,
      reactHooks: eslintPluginReactHooks,
      reactRefresh: eslintPluginReactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // TODO use prettier eslint plugin here?
      // Automatically flag env vars missing from turbo.json
      "turbo/no-undeclared-env-vars": "error",
      "import/prefer-default-export": "off",
      "no-console": "off",
      // Disable if it becomes really annoying
      // '@typescript-eslint/no-shadow': 'off',
      // As per https://stackoverflow.com/a/55863857/7365866
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.test-utils.ts",
            "**/*.test-utils.tsx",
          ],
        },
      ],

      // Following changes similar to https://github.com/shadcn-ui/ui/issues/1534#issue-1899453318 because shadcn/ui doesn't respect this rule
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
      // Too much spam when we don't use variables when overriding methods in classes.
      // Also see https://www.totaltypescript.com/tsconfig-cheat-sheet
      "@typescript-eslint/no-unused-vars": "off",
      // Disable prop-types rule since we use TS. This does disable runtime prop checks
      // We do this to prevent errors in some shadcn/ui components e.g. `error  'className' is missing in props validation`
      // Code taken from https://github.com/shadcn-ui/ui/issues/120#issuecomment-1828081539
      "react/prop-types": "off",
      // Prevent errors when application eslint.config.js imports from this package, causing `'eslint-config-repo' should be listed in the project's dependencies, not devDependencies`
      "import/no-extraneous-dependencies": "off"
    },
    // Alternative approach to avoid shadcn/ui prop types eslint errors (but needs hardcoding of specific props)
    // overrides: [
    //   {
    //     files: ["**/components/ui/*.tsx"],
    //     rules: {
    //       "react/prop-types": [2, { ignore: ["className", "sideOffset"] }],
    //       "react-refresh/only-export-components": "off",
    //     },
    //   },
    // ],
  },
);
