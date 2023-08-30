/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-29 14:44:43
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-08-30 18:04:03
 * @FilePath: /LowCodeGoGoGo/src/figmaCode/code.ts
 * @Description: figma插件的入口文件
 */
console.log('figma plugin code runs!')
import { initListenFigma } from './listenFigma'
figma.showUI(__html__, {
  width: 400,
  height: 400
})

const nodes: RectangleNode[] = []

figma.ui.onmessage = (msg) => {
  if (msg.type === 'add-block') {
    const rect = figma.createRectangle()
    rect.x = nodes.length * 150
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
    figma.currentPage.appendChild(rect)
    nodes.push(rect)
  } else if (msg.type === 'sub-block') {
    const rect = nodes.pop()
    if (rect) {
      rect.remove()
    }
  }

  figma.viewport.scrollAndZoomIntoView(nodes)
}
// 监听figma事件
initListenFigma()
