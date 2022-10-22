<template>
  <div>
    <div>
      <button @click="btnOpenDialog1">第一個彈窗</button>
    </div>
    <div style="margin-top: 50px">
      <button @click="btnOpenDialog2">第2個彈窗</button>
    </div>
    <div style="margin-top: 50px">
      <button @click="btnOpenDialog3">第3個彈窗</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDialog } from "./plugins/dialog/index";
import confirmDialog from "./plugins/dialog/confirmDialog.vue"
import inputDialog from "./plugins/dialog/inputDialog.vue"
import alertDialog from "./plugins/dialog/alertDialog.vue"

export default defineComponent({
  name: "App",
  setup() {
    const prop1 = {
      user_id: "USER_ID",
    };
    const { openDialog } = useDialog();

    const btnOpenDialog1 = () => {
      openDialog(confirmDialog, {
        user_id: prop1.user_id
      })
    };
    const btnOpenDialog2 = () => {
      openDialog(inputDialog, { product: 123 });
    };
    const btnOpenDialog3 = () => {
      openDialog(alertDialog)
    };
    return {
      btnOpenDialog1,
      btnOpenDialog2,
      btnOpenDialog3
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
