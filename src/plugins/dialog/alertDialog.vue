<template>
  <modal>
    <template #header>
      header
    </template>
    <template #body>
      body
    </template>
    <template #footer="{ close }">
      <button @click="close">
        close
      </button>
    </template>
  </modal>
</template>
<script lang="ts">
import Modal from './template.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AlertModal',
  components: {
    Modal
  }
})
</script>

