<!--
 * @Author: 陈谦 chenq178@vanke.com
 * @Date: 2023-08-29 14:37:01
 * @LastEditors: 陈谦 chenq178@vanke.com
 * @LastEditTime: 2023-08-30 17:39:09
 * @FilePath: /LowCodeGoGoGo/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref } from 'vue'
const num = ref(0)

async function addBlock() {
  num.value += 1
  parent.postMessage({ pluginMessage: { type: 'add-block' } }, '*')
}

function subBlock() {
  console.log('substract')
  if (num.value === 0) return
  num.value -= 1
  parent.postMessage({ pluginMessage: { type: 'sub-block' } }, '*')
}
</script>

<template>
  <h1>lowcode-googogo</h1>
  <p>
    当前色块数量：<span id="block-num">{{ num }}</span>
  </p>
  <div class="buttons">
    <button id="btn-add" @click="addBlock">+</button>
    <button id="btn-sub" @click="subBlock">-</button>
  </div>
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
