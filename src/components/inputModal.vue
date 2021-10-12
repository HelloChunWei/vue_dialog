<template>
  <modal>
    <template #header>
      我第二個modal
    </template>
    <template #body>
      <input type="text" v-model="test">
      {{ test }}
    </template>
    <template #footer="{ close }">
      <button @click="close">
        返回
      </button>
    </template>
  </modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Modal from '@/components/modal_t.vue'
export default defineComponent({
  name: 'confirmModal',
  components: {
    Modal
  },
  setup () {
    const test = ref('')
    return {
      test
    }
  }
})
</script>

