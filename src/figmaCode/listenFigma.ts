import { useSelectionChange } from './listenMethods/useSelectionChange'

const selectionCbs = useSelectionChange()
export const initListenFigma = () => {
  figma.on('selectionchange', () => {
    selectionCbs.forEach((cb) => cb())
  })
}
