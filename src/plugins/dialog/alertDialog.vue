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
<script lang="ts" setup>
import Modal from './template.vue'
import { defineComponent, defineProps } from 'vue'

</script>

