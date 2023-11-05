const prettierConfig = require('./prettier.config');

module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', prettierConfig],
  },
};
