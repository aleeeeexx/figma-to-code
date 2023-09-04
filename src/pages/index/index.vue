<!--
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 17:51:41
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 11:33:43
 * @Description: 
-->
<template>
  <button @click="presenter.handleTrasformerDesign">获取转换代码</button>
  <!-- <button @click="presenter.handleAddbolock">增加测试区块</button> -->
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
console.log(model)
</script>
<style scoped lang="scss">
@import './index';
</style>
