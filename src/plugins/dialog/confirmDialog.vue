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
<script lang="ts" setup>
import Modal from './template.vue'
import { Props } from './propsInterface/confirmDialogProps'
defineProps<Props>()
</script>

