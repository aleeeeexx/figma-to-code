<!--
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-29 14:37:01
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-09-01 17:21:36
 * @FilePath: /LowCodeGoGoGo/src/App.vue
-->
<script setup lang="ts">
import index from './pages/index/index.vue'
// async function addBlock() {
//   num.value += 1
//   parent.postMessage({ pluginMessage: { type: 'add-block' } }, '*')
// }
const handleTrasformerDesign = () => {}
</script>

<template>
  <h1>lowcode-ggg</h1>
  <index />
  <button class="" @click="handleTrasformerDesign">获取转换代码</button>
</template>

<style scoped>
h1 {
  text-align: center;
}
p {
  color: red;
}

.buttons {
  margin-top: 20px;
  text-align: center;
}

.buttons button {
  width: 40px;
}

#block-num {
  font-size: 20px;
}
</style>
