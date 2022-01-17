<template>
  <modal>
    <template #header>
      我第二個modal
    </template>
    <template #body>
      {{ product }}
    </template>
    <template #footer="{ close }">
      <button @click="close">
        返回
      </button>
    </template>
  </modal>
</template>
<script lang="ts" setup>
import Modal from './template.vue'
import { Props } from './propsInterface/inputModalProps'
defineProps<Props>()
</script>

