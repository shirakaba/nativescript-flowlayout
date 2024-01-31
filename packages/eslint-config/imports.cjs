module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  env: { es6: true },
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
