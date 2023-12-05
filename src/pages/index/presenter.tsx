/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 18:04:04
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 11:30:21
 * @Description:
 */
import Service from './service'
import { useModel } from './model'

import axios from 'axios'

export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)
  const handleTrasformerDesign = () => {
    parent.postMessage({ pluginMessage: { type: 'transformer-design' } }, '*')
    // getChatGpt()
  }
  const handleAddbolock = () => {
    parent.postMessage({ pluginMessage: { type: 'add-block' } }, '*')
  }

  //eslint-disable-next-line
  const getChatGpt = (data: any) => {
    console.log('datagetchangt', data)
    const prompt = 'Hello, how are you?' // Your prompt
    const maxTokens = 60 // Maximum number of tokens in the response
    axios
      .post(
        'https://api.chatanywhere.com.cn/v1:443',
        {
          prompt,
          alexdata: data,
          max_tokens: maxTokens
        },
        {
          headers: {
            Authorization: `Bearer sk-SQxRb981rNFOn8pwyjGnSL9dJwGIRwDBMx8Hproa70W1OTns`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        console.log(response.data.choices[0].text.trim())
      })
      .catch(error => {
        console.error(error)
      })
  }
  //eslint-disable-next-line
  const submitFigmaDataToVscode = (data: any) => {
    axios
      .post(model.url.value, {
        figmaData: { type: '表单', formItems: data, defineProps: false, defineEmits: false }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  return {
    model,
    service,
    handleTrasformerDesign,
    handleAddbolock,
    getChatGpt,
    submitFigmaDataToVscode
  }
}
