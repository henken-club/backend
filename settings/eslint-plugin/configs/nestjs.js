module.exports = {
  "overrides": [
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
