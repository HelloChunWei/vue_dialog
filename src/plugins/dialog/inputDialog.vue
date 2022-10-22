<template>
  <modal>
    <template #header>
      header
    </template>
    <template #body>
      {{ product }}
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
  name: 'inputDialog',
  components: {
    Modal
  },
  props: {
    product: {
      type: Number,
      required: true
    }
  }
})
</script> 

