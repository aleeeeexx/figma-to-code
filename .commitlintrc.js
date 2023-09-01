/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 17:24:54
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-01 17:25:00
 * @Description:
 */
// .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'body-max-line-length': [0, 'always', Infinity]
  }
}
