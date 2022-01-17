<template>
  <modal>
    <template #header>
      我是頭
    </template>
    <template #body>
      alertModal
    </template>
    <template #footer="{ close }">
      <button @click="close">
        取消
      </button>
    </template>
  </modal>
</template>
<script lang="ts" setup>
import Modal from './template.vue'
</script>

