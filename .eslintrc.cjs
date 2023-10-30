module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}
