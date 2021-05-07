module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    },
  env: {
      "node": true,
    },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
      "airbnb-typescript/base"
  ],
  rules: {
  "no-console": "off",
  "no-unused-vars": "warn",
  "key-spacing": ["warn", {"align": "colon"}],
  "quotes": [
  "error",
  "single"],
  "semi": [
  "warn",
  "always"
  ]},

}