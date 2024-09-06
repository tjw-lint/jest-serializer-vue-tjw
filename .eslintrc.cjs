const baseRestrictedSyntax = require('eslint-config-tjw-base/no-restricted-syntax.json');
const jestRestrictedSyntax = require('eslint-config-tjw-jest/no-restricted-syntax.json');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2022,
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  },
  env: {
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    jsdom: true,
    Promise: true,
    Vue: true
  },
  plugins: [
    'vue'
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'tjw-base',
    // 'tjw-import',
    'tjw-jest',
    'tjw-vue'
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      ...baseRestrictedSyntax,
      ...jestRestrictedSyntax
    ]
  }
};
