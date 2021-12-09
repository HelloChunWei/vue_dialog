import { createApp } from 'vue'
import Modal from './modal.vue'

type componentNameType = 'confirmModal' | 'inputModal'

export default function ({ componentName, myProps }: { componentName: componentNameType, myProps: any }) {
  const container = document.createElement('div')

  const _closeModal = function () {
    container.parentNode!.removeChild(container)
  };
  const myPropss = Object.assign({}, {
    isShow: true,
    componentName,
    myProps,
    close: _closeModal
  })

  const vnode = createApp(Modal, myPropss)
  document.body.appendChild(container)
  vnode.mount(container)
  
}
