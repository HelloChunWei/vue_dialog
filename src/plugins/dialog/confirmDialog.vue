<template>
  <modal>
    <template #header>
      header
    </template>
    <template #body>
      {{ user_id }}
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
import { useDialog } from "./index";
import inputDialog from "./inputDialog.vue"
export default defineComponent({
  name: 'ConfirmDialog',
  components: {
    Modal,
  },
  props: {
    user_id: {
      type: String,
      required: true
    },
  },
  setup () {
    const { openDialog } = useDialog()

    openDialog(inputDialog)
  }
})

</script>

