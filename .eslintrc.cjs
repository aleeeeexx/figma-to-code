/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-31 16:54:38
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-01 14:55:53
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        printWidth: 100,
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 0,
    quotes: 0,
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'none',
        varsIgnorePattern: 'usePresenter|reactive|ref|^I',
        caughtErrors: 'none'
      }
    ],
    '@typescript-eslint/no-explicit-any': ['error'], //禁止使用any
    eqeqeq: 2, //必须使用全等
    'max-lines': ['error', 500] //限制行数 请勿修改 请优化你的代码
  }
}
