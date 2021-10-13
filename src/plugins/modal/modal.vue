<template>
  <component v-if="isShow" :is="myComponent" v-bind="myProps" @close="close" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, unref } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: ['myProps', 'isShow', 'close', 'componentName'],
  setup(props) {
    const { componentName } = unref(props)
    const myComponent = defineAsyncComponent(() => import(`./${componentName}.vue`))
    return {
      myComponent
    }
  },
})
</script>

