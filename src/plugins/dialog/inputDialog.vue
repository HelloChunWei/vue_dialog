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
<script lang="ts" setup>
import Modal from './template.vue'
import { Props } from './propsInterface/inputDialogProps'
import { CLOSE_DIALOG, injectStrict } from './provideInject'
const props = defineProps<Props>()
const close = injectStrict(CLOSE_DIALOG)
</script> 

