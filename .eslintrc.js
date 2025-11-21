module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'security',
    'no-secrets',
    'sonarjs',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    'security/detect-object-injection': 'warn',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error',
    'no-secrets/no-secrets': ['error', { tolerance: 4.5 }],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-eval': 'error',
  },
};