<template>
  <modal>
    <template #header>
      header
    </template>
    <template #body>
     <p> {{ user_id }}</p>
     <p>{{  id  }}</p>
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
  name: 'ConfirmDialog',
  components: {
    Modal,
  },
  props: {
    user_id: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
})

</script>

