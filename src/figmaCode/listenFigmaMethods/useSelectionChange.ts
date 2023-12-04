/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-30 17:09:18
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-08-30 18:03:10
 * @Description:导出监听figma的selectionChange事件的回调事件
 */

export const useSelectionChange = () => {
  const getFigmaJson = () => {
    const selection = figma.currentPage.selection
    console.log(selection, 'selcted-change')
  }
  return [getFigmaJson]
}
