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
<script lang="ts">
import { defineComponent } from 'vue'
import Modal from './template.vue'
export default defineComponent({
  name: 'confirmModal',
  components: {
    Modal
  },
  props: ['user_id'],
})
</script>

