/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-29 14:44:43
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-08-30 17:48:10
 * @FilePath: /LowCodeGoGoGo/src/figmaCode/code.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
initListenFigma()
