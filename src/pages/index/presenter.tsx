/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 18:04:04
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 11:30:21
 * @Description:
 */
import Service from './service'
import { useModel } from './model'
// async function addBlock() {
//   num.value += 1
//   parent.postMessage({ pluginMessage: { type: 'add-block' } }, '*')
// }
export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)
  const handleTrasformerDesign = () => {
    parent.postMessage({ pluginMessage: { type: 'transformer-design' } }, '*')
  }
  const handleAddbolock = () => {
    parent.postMessage({ pluginMessage: { type: 'add-block' } }, '*')
  }
  return {
    model,
    service,
    handleTrasformerDesign,
    handleAddbolock
  }
}
