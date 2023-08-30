export const useSelectionChange = () => {
  const getFigmaJson = () => {
    const selection = figma.currentPage.selection
    console.log(selection, 'selectionjkjkj')
  }
  return [getFigmaJson]
}
