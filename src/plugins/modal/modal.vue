<template>
  <fade>
    <component ref="modal" v-if="isShow" :is="myComponent" v-bind="myProps" />
  </fade>
</template>

<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  watchEffect,
  ref,
  toRefs
} from "vue"
import { unrefElement } from "@vueuse/core"
import { findMaxZindex } from "../../utils/helper"
import Fade from '../transition/fade.vue'

const modules = import.meta.glob('./*.vue')
export default defineComponent({
  name: "Modal",
  props: ["myProps", "isShow", "component"],
  components: {
    Fade
  },
  setup(props) {
    const { component, isShow } = toRefs(props)
    const myComponent = defineAsyncComponent(modules[`./${component.value}.vue`])
    const modal = ref<HTMLElement | null>(null);

    watchEffect((onInvalidate) => {
      if (!isShow.value) return

      // 控制 body 的 scroll
      const overflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = "hidden"

      const zIndex = findMaxZindex()
      if (unrefElement(modal.value)) {
        unrefElement(modal.value)!.style.zIndex = zIndex.toString()
      }

      onInvalidate(() => {
        // 還原 scroll
        document.documentElement.style.overflow = overflow
      })
    })

    return {
      myComponent,
      modal
    };
  },
});
</script>

