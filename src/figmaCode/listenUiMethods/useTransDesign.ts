export const useTransDesign = () => {
  interface translateDataType {
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
    // {
    //       type: 'string',
    //       optional: false,
    //       defaultValue: '""',
    //       component: 'van-switch',
    //       required: false,
    //       showMore: false,
    //       slots: false,
    //       key: 't',
    //       label: 't'
    //     },
    const traslatedFormItem = fillInputData(node, formItemObj)
    console.log(traslatedFormItem, 'traslatedFormItem')
    traslatedFormItem && formItems.push(traslatedFormItem)
  }

  // 填充input框的数据
  const fillInputData = (figmaNode: SceneNode, formItemObj: translateDataType) => {
    if (!figmaNode.visible) return

    // van-cell节点
    if (figmaNode.name === 'van-cell') {
      formItemObj.component = 'van-cell'
      formItemObj.type = 'string'
    }
    // input节点
    if (figmaNode.name === 'van-cell van-field') {
      formItemObj.component = 'input'
      formItemObj.type = 'string'
    }

    // switch节点
    if (figmaNode.name.includes('van-switch')) {
      formItemObj.component = 'van-switch'
      formItemObj.type = 'boolean'
      formItemObj.defaultValue = true
    }

    // checkbox节点
    if (figmaNode.name.includes('van-checkbox')) {
      formItemObj.component = 'van-checkbox'
      formItemObj.type = 'boolean'
      formItemObj.defaultValue = true
    }

    // checkbox-group节点
    // group节点要放到checkbox后面，因为van-checkbox的数据会自动生成包含van - checkbox的结构爱, 包含关系，
    if (figmaNode.name.includes('van-checkbox-group')) {
      formItemObj.component = 'van-checkbox-group'
      formItemObj.type = 'string[]'
      formItemObj.defaultValue = []
    }

    // radio-group节点,一般和radio节点一起使用,因此不需要单独处理radio
    if (figmaNode.name.includes('van-radio-group')) {
      formItemObj.component = 'input'
      formItemObj.type = 'string'
    }

    // van-stepper节点
    if (figmaNode.name.includes('van-stepper')) {
      formItemObj.component = 'van-stepper'
      formItemObj.type = 'number'
      formItemObj.defaultValue = 0
    }

    //van-uploader节点
    if (figmaNode.name.includes('van-uploader')) {
      formItemObj.component = 'van-uploader'
      formItemObj.type = 'string[]'
      formItemObj.defaultValue = []
    }

    // van-picker节点:这个节点需要设计师标注它是一个van-picker,才可识别，因为它默认的node.name是一个禁用的input
    if (figmaNode.name.includes('picker')) {
      formItemObj.component = 'van-picker'
      formItemObj.type = 'string'
      formItemObj.readonly = true
      formItemObj.clickable = true
      formItemObj.isLink = true
    }

    //van-time-picker:这个节点需要设计师标注它是一个van-datetime-picker,才可识别，因为它默认的node.name是一个禁用的input
    if (figmaNode.name.includes('van-datetime-picker')) {
      formItemObj.component = 'van-datetime-picker'
      formItemObj.type = 'string'
      formItemObj.readonly = true
      formItemObj.clickable = true
      formItemObj.isLink = true
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

        // 寻找是否有右箭头
        //寻找...
        //todo:优化递归
      })
    }
    return formItemObj
  }

  // //填充switch的数据
  // const fillSwitchData = (figmaNode: SceneNode, formItemObj: translateDataType) => {
  //   if (figmaNode.name.includes('switch')) {
  //     formItemObj.component = 'switch'
  //     formItemObj.type = 'boolean'
  //   }
  //   if ('children' in figmaNode) {
  //     figmaNode.children.forEach(childNode => {
  //       //寻找label的值
  //       if (childNode.name === 'van-switch__label' && childNode.visible) {
  //         if ('children' in childNode && 'characters' in childNode.children[0]) {
  //           formItemObj.label = childNode.children[0].characters
  //         }
  //       } else {
  //         fillSwitchData(childNode, formItemObj)
  //       }
  //     })
  //   }
  //   return formItemObj
  // }

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
