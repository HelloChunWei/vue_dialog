<template>
  <div>
    <button @click="btnOpenModal('confirmModal')">第一個彈窗</button>
  </div>
  <div style="margin-top: 50px">
    <button @click="btnOpenModal('inputModal')">第2個彈窗</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModal } from "./plugins/modal/index";

export default defineComponent({
  name: "App",
  setup() {
    const prop1 = {
      user_id: "這裡是modal的prop",
    };
    const { openModal } = useModal();

    const btnOpenModal = (component: "confirmModal" | "inputModal") => {
      openModal({ component, myProps: prop1 });
    };
    return {
      btnOpenModal,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
