export const useTransDesign = () => {
  interface BaseComponentType {
    name?: string
    type?: string
    optional?: boolean
    defaultValue?: string | number | boolean | [] | undefined
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

  const baseComponent: BaseComponentType = {
    type: '',
    optional: false,
    defaultValue: '',
    component: '',
    required: false,
    showMore: false,
    key: '',
    label: ''
  }
  let formItems: BaseComponentType[] = []
  const componentMapping: {
    [key: string]: BaseComponentType
  } = {
    'van-cell': { component: 'van-cell', type: 'string', defaultValue: '' },
    'van-cell van-field': { component: 'input', type: 'string', defaultValue: '' },
    'van-switch': { component: 'van-switch', type: 'boolean', defaultValue: true },
    'van-checkbox': { component: 'van-checkbox', type: 'boolean', defaultValue: true },
    'van-checkbox-group': { component: 'van-checkbox-group', type: 'string[]', defaultValue: [] },
    'van-radio-group': { component: 'van-radio-group', type: 'string', defaultValue: '' },
    'van-stepper': { component: 'van-stepper', type: 'number', defaultValue: 0 },
    'van-uploader': { component: 'van-uploader', type: 'string[]', defaultValue: [] },
    'van-picker': {
      component: 'van-picker',
      type: 'string',
      defaultValue: '',
      readonly: true,
      clickable: true,
      isLink: true
    },
    'van-datetime-picker': {
      component: 'van-datetime-picker',
      type: 'string',
      defaultValue: '',
      readonly: true,
      clickable: true,
      isLink: true
    }
    // 其他组件映射
    // ...
  }

  const transformerFigmaData = () => {
    const selectedNodes = figma.currentPage.selection
    if (selectedNodes.length === 0) return figma.notify('请先选中要转换的设计稿！')
    if (selectedNodes.length > 1) return figma.notify('一次只能选中一个组件！')
    console.log(selectedNodes, '当前选择的元素')
    const selectedNode = selectedNodes[0]
    fillFormItemData(selectedNode)
  }

  const findLabel = (figmaNode: SceneNode, formItemObj: BaseComponentType): boolean => {
    if (!figmaNode || !figmaNode.visible) return false
    if (figmaNode.name === 'van-field__label' && figmaNode.visible) {
      if ('children' in figmaNode && 'characters' in figmaNode.children[0]) {
        console.log(figmaNode.children[0].characters, 'figmaNode.children')
        formItemObj.label = figmaNode.children[0].characters
        return true // 返回 true 表示找到了标签
      }
    } else {
      if ('children' in figmaNode) {
        for (const childNode of figmaNode.children) {
          const found = findLabel(childNode, formItemObj)
          if (found) return true // 如果在子节点中找到标签，提前退出循环
        }
      }
    }
    return false // 如果没有找到标签，返回 false
  }

  const findRequired = (figmaNode: SceneNode, formItemObj: BaseComponentType): boolean => {
    if (!figmaNode || !figmaNode.visible) return false
    if (figmaNode.name === 'required' && figmaNode.visible) {
      formItemObj.required = true
      return true
    } else {
      if ('children' in figmaNode) {
        for (const childNode of figmaNode.children) {
          const found = findRequired(childNode, formItemObj)
          if (found) return true
        }
      }
    }
    return false
  }

  const processNodeForAttributes = (node: SceneNode, formItemObj: BaseComponentType) => {
    findLabel(node, formItemObj)
    findRequired(node, formItemObj)
  }

  // 递归寻找表单组件，并填充数据
  const fillFormItemData = (figmaNode: SceneNode) => {
    if (!figmaNode.visible || !figmaNode) return
    const componentInfo = componentMapping[figmaNode.name]
    if (componentInfo) {
      // const formItemObj = { ...baseComponent, ...componentInfo, key: `value${formItems.length}` }
      const formItemObj = Object.assign({}, baseComponent, componentInfo, {
        key: `value${formItems.length}`
      })
      processNodeForAttributes(figmaNode, formItemObj)
      formItems.push(formItemObj)
    } else if ('children' in figmaNode) {
      figmaNode.children.forEach(childNode => fillFormItemData(childNode))
    }
  }

  const submitFigmaDataToVSLowCodePlugin = () => {
    figma.ui.postMessage({ type: 'node-data', data: formItems })
  }

  const handleTrasferFigmaDesignData = () => {
    formItems = []
    transformerFigmaData()
    console.log(formItems, '转换好的表单数据')
    if (formItems.length === 0) return console.log('选中的页面中没有表单元素！')
    submitFigmaDataToVSLowCodePlugin()
  }
  return {
    handleTrasferFigmaDesignData
  }
}
