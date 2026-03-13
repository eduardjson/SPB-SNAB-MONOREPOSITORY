module.exports = {
  extends: ['../../.eslintrc.base.js', '@nestjs/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Специфические правила для NestJS, если нужны
  },
};
