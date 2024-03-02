import { createApp } from 'vue'
import App from './App.vue'


// can infer type at ts file now
import { useDialog } from "./plugins/dialog/index";
import confirmDialog from "./plugins/dialog/confirmDialog.vue"

const { openDialog } = useDialog()
openDialog(confirmDialog, {
    id: '123',
})

createApp(App).mount('#app')
