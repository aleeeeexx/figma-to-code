export const useTransDesign = () => {
  interface translateDataType {
    name?: string
    type?: string
    optional?: boolean
    defaultValue?: string
    component?: string
    required?: boolean
    showMore?: boolean
    slots?: boolean
    key?: string
    placeholder?: string
    label?: string
    propType?: string
    size?: string
    border?: boolean
    disabled?: boolean
    readonly?: boolean
    colon?: boolean
    center?: boolean
    clearable?: boolean
    clickable?: boolean
    isLink?: boolean
    autofocus?: boolean
    showWordLimit?: boolean
    arrowDirection?: string
    labelAlign?: string
    inputAlign?: string
    maxlength?: string
    labelSlot?: boolean
    leftIcon?: boolean
    rightIcon?: boolean
    button?: boolean
    extra?: boolean
  }

  let formItems: translateDataType[] = []

  const transformerFigmaData = () => {
    const selectionNodes =
      figma.currentPage.selection.length > 0
        ? figma.currentPage.selection
        : figma.currentPage.children
    if (!selectionNodes || selectionNodes.length === 0) return console.log('请先选择元素！')
    console.log(selectionNodes, '当前选择的元素')
    const formNode = selectionNodes[0]
    if (formNode.name !== 'form') return console.log('请先选择form表单！')
    if ('children' in formNode) {
      console.log(formNode.children, 'formNode.children')
      formNode.children.forEach((formItemNode, idx) => fillData(formItemNode, idx))
    } else {
      console.log('表单中没有FormItem')
    }
  }
  const fillData = (node: SceneNode, idx: number) => {
    //node-select级别的组件
    const formItemObj: translateDataType = {
      type: '',
      optional: false,
      defaultValue: '',
      component: '',
      required: false,
      showMore: false,
      key: 'value' + idx,
      label: ''
    }

    const traslatedFormItem = fillInputData(node, formItemObj)
    console.log(traslatedFormItem, 'traslatedFormItem')
    formItems.push(traslatedFormItem)
  }

  // 递归去填充input框的数据
  const fillInputData = (figmaNode: SceneNode, formItemObj: translateDataType) => {
    if (figmaNode.name.includes('field')) {
      formItemObj.component = 'input'
      formItemObj.type = 'string'
    }
    if ('children' in figmaNode) {
      figmaNode.children.forEach(childNode => {
        //寻找label的值
        if (childNode.name === 'van-field__label' && childNode.visible) {
          if ('children' in childNode && 'characters' in childNode.children[0]) {
            formItemObj.label = childNode.children[0].characters
          }
        } else {
          fillInputData(childNode, formItemObj)
        }

        //寻找是否require
        if (childNode.name === 'required' && childNode.visible) {
          formItemObj.required = true
        } else {
          fillInputData(childNode, formItemObj)
        }
      })
    }
    return formItemObj
  }

  const submitFigmaDataToVSLowCodePlugin = () => {
    figma.ui.postMessage({ type: 'node-data', data: formItems })
  }

  const handleTrasferFigmaDesignData = () => {
    formItems = []
    transformerFigmaData()
    console.log(formItems, '转换好的表单数据')
    submitFigmaDataToVSLowCodePlugin()
  }
  return {
    handleTrasferFigmaDesignData
  }
}
