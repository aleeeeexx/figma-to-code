/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-30 15:00:55
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-08-30 18:05:46
 * @Description:把监听figma事件的回调事件进行绑定
 */

import { useSelectionChange } from './listenFigmaMethods/useSelectionChange'
const selectionCbs = useSelectionChange()

export const initListenFigma = () => {
  figma.on('selectionchange', () => {
    selectionCbs.forEach((cb) => cb())
  })
}
