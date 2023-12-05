/*
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 18:04:04
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 09:52:08
 * @Description:
 */
import { ref } from 'vue'

export const useModel = () => {
  const url = ref('http://localhost:2023/submitFigmaData')
  return { url }
}

export type Model = ReturnType<typeof useModel>
