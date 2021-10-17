module.exports = {
  extends: [
    "plugin:@shopify/typescript",
  ],
  plugins: ["unused-imports"],
  rules: {
    "@typescript-eslint/consistent-type-definitions": [2, "type"],
    "@typescript-eslint/consistent-indexed-object-style": [2, "record"],
    "@shopify/typescript/prefer-pascal-case-enums": [0],

    /* unused */
    "import/extensions": [0],
    "unused-imports/no-unused-imports": [2],

    /* dprint */
    // member delimiter
    "@typescript-eslint/member-delimiter-style": [2, {
      "multiline": { "delimiter": "semi", "requireLast": true },
      "singleline": { "delimiter": "semi", "requireLast": false },
    }],
    // quotes
    "quotes": [0],
    "@typescript-eslint/quotes": [2, "double"],
    // brace-style
    "brace-style": 0,
    "@typescript-eslint/brace-style": [2],
    // curly-spacing
    "object-curly-spacing": 0,
    "babel/object-curly-spacing": 0,
    "@typescript-eslint/object-curly-spacing": [2, "always"],
    // no-extra-parens
    "no-extra-parens": 0,
    "@typescript-eslint/no-extra-parens": [2, "functions"],
  },
  "overrides": [
    {
      "files": ["*.d.ts"],
      "rules": {
        "spaced-comment": [0],
        "@typescript-eslint/triple-slash-reference": [0],
        "@typescript-eslint/consistent-type-definitions": [0],
        "@typescript-eslint/no-namespace": [0],
      },
    },
    {
      "files": ["*.module.ts"],
      "rules": {
        "@typescript-eslint/no-extraneous-class": 0,
      },
    },
    {
      "files": ["*.config.ts"],
      "rules": {
        "no-process-env": 0,
      },
    },
  ],
};
