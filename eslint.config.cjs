const js = require("@eslint/js");
const globals = require("globals");
const react = require("eslint-plugin-react");
const hooks = require("eslint-plugin-react-hooks");
const prettier = require("eslint-config-prettier");

module.exports = [
  { ignores: ["dist/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, process: "readonly" },
    },
    plugins: { react, "react-hooks": hooks },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["*.config.js", "*.config.cjs"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
  prettier,
];
