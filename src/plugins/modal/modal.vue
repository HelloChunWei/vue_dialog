<template>
  <component ref="modal" v-if="isShow" :is="myComponent" v-bind="myProps" @close="close" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, unref, watchEffect, ref } from 'vue'
import { unrefElement } from '@vueuse/core'
import { findMaxZindex } from '@/utils/helper'

export default defineComponent({
  name: 'Modal',
  props: ['myProps', 'isShow', 'close', 'componentName'],
  setup(props) {
    const { componentName, isShow } = unref(props)
    const myComponent = defineAsyncComponent(() => import(`./${componentName}.vue`))
    const modal = ref<HTMLElement | null>(null)

    watchEffect(onInvalidate => {
      if (!isShow) return

      // 控制 body 的 scroll
      const overflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'

      const zIndex = findMaxZindex()
      if (unrefElement(modal)) {
        unrefElement(modal)!.style.zIndex = zIndex.toString()
      }

      onInvalidate(() => {
        // 還原 scroll
        document.documentElement.style.overflow = overflow
      })
    })

    return {
      myComponent,
      modal
    }
  },
})
</script>

