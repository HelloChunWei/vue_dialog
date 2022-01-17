<template>
  <div>
    <button @click="btnOpenModal1">第一個彈窗</button>
  </div>
  <div style="margin-top: 50px">
    <button @click="btnOpenModal2">第2個彈窗</button>
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

    const btnOpenModal1 = () => {
      openModal("confirmModal", { user_id: prop1.user_id });
    };
    const btnOpenModal2 = () => {
      openModal("inputModal", { product: 123 });
    };
    return {
      btnOpenModal1,
      btnOpenModal2
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
