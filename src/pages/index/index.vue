<!--
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 17:51:41
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 11:33:43
 * @Description: 
-->
<template>
  <div class="addr">
    <div class="addr-label">发送地址:</div>
    <input
      placeholder="请输入要发送的后端地址，默认http://localhost:3000/submitFigmaData"
      v-model="model.url.value"
      class="addr-input"
    />
  </div>
  <button @click="presenter.handleTrasformerDesign">获取设计稿数据并发送</button>
  <!-- <button @click="presenter.handleAddbolock">增加测试区块</button> -->
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
console.log(model)
window.onmessage = async event => {
  const msg = event.data.pluginMessage
  if (msg.type === 'node-data') {
    console.log(msg.data, 'msg.data')
    presenter.submitFigmaDataToVscode(msg.data)
  }
}
</script>
<style scoped lang="scss">
@import './index';
</style>
