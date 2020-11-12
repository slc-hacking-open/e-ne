module.exports = {
  plugins: ["stylelint-order", "stylelint-prettier"],
  extends: [
    "stylelint-prettier/recommended",
    "./node_modules/prettier-stylelint/config.js",
  ],
  ignoreFiles: ["**/node_modules/**"],
  rules: {
    indentation: 2,
    "string-quotes": "single",
    "order/properties-alphabetical-order": true,
  },
}
