<!--
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 17:51:41
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-04 09:41:49
 * @Description: 
-->
<template>
  <div class="index" @click="presenter.a('b')">{{ model.name.value }}</div>
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
</script>
<style scoped lang="scss">
@import './index';
</style>
