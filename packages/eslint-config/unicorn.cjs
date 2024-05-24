module.exports = {
  extends: [
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    "plugin:unicorn/recommended",
  ],
  rules: {
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/explicit-length-check": "off",
  },
};
