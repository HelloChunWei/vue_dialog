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
import { defineComponent } from 'vue'
import Modal from './template.vue'
export default defineComponent({
  name: 'alertModal',
  components: {
    Modal
  }
})
</script>

