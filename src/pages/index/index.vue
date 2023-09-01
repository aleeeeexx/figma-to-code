<!--
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-09-01 17:51:41
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-01 18:01:57
 * @Description: 
-->
<template>
  <div class="index">{{ model.name.value }}</div>
</template>
<script lang="ts" setup>
import { usePresenter } from './presenter'

const presenter = usePresenter()
const { model } = presenter
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
