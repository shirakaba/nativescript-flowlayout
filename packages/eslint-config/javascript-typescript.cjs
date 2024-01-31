module.exports = {
  extends: [
    "./javascript.cjs",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
};
