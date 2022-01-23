<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FadeTransition'
})
</script>

<style scoped>
.fade-enter-from {
  transition: opacity .2s ease-in-out;
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  transition: opacity .2s ease-in-out;
  opacity: 0;
}
</style>


