/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-29 14:37:01
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-08-31 17:56:10
 * @Description:
 */
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, unknown>
  export default component
}
