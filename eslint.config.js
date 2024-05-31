import js from '@eslint/js'
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['js/**/*.js'],

    languageOptions: {
      globals: {
        ...globals.browser
      }
    },

    rules: {
      'strict': ['error', 'safe']
    },
  },
];
