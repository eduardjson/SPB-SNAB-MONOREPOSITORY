module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // полезно для React, но не мешает и в NestJS
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // отключает конфликтующие с Prettier правила ESLint
  ],
  rules: {
    // Удаление неиспользуемых импортов
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    // Сортировка импортов
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    // Отключаем стандартное правило no-unused-vars в пользу плагина
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};