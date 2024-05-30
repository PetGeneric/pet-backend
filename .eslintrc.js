module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'warn',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'no-nested-ternary': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'parent',
          'internal',
          'index',
          'sibling',
          'builtin',
          'object',
          'type',
        ],
        'newlines-between': 'never',
        pathGroups: [
          {
            pattern: '@nestjs/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@app/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
