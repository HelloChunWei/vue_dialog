import { createApp } from 'vue'
import App from './App.vue'

// can not infer type at ts file
/*
import { useDialog } from "./plugins/dialog/index";
import confirmDialog from "./plugins/dialog/confirmDialog.vue"

const { openDialog } = useDialog()
openDialog(confirmDialog)
*/
createApp(App).mount('#app')
