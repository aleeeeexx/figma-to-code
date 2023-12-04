/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-29 14:44:43
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 11:22:04
 * @FilePath: /LowCodeGoGoGo/src/figmaCode/code.ts
 * @Description: figma插件的入口文件
 */

console.log('figma plugin code runs!')
import { initListenFigma } from './listenFigma'
import { useTransDesign } from './listenUiMethods/useTransDesign'
figma.showUI(__html__, {
  width: 400,
  height: 400
})

// -------监听figma事件-----
initListenFigma()

// ------监听ui事件------
const { handleTrasferFigmaDesignData } = useTransDesign()
const nodes: RectangleNode[] = []
const handleMaps: { [key: string]: () => void } = {
  'add-block': () => {
    const rect = figma.createRectangle()
    rect.x = nodes.length * 150
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
    figma.currentPage.appendChild(rect)
    nodes.push(rect)
  },
  'sub-block': () => {
    const rect = nodes.pop()
    if (rect) {
      rect.remove()
    }
  },
  'transformer-design': handleTrasferFigmaDesignData
}
figma.ui.onmessage = (msg: { type: string }) => {
  handleMaps[msg.type]()
  figma.viewport.scrollAndZoomIntoView(nodes)
}
