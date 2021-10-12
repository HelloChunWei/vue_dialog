<template>
  <teleport to="body">
  <component v-if="isShow" :is="myComponent" v-bind="myProps" @close="close" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: ['myProps', 'isShow', 'close', 'componentName'],
  setup(props) {
    const { componentName } = toRefs(props)
    const myComponent = defineAsyncComponent(() => import(`@/components/${componentName.value}.vue`))
    return {
      myComponent
    }
  },
})
</script>

