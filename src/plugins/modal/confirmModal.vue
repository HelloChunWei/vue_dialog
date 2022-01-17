<template>
  <modal>
    <template #header>
      我是頭
    </template>
    <template #body>
      {{ user_id }}
    </template>
    <template #footer="{ close }">
      <button @click="close">
        多個按鈕
      </button>
      <button @click="close">
        取消
      </button>
    </template>
  </modal>
</template>
<script lang="ts" setup>
import Modal from './template.vue'
import { Props } from './propsInterface/confirmModalProps'
defineProps<Props>()
</script>

