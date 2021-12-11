import { createApp } from 'vue'
import Modal from './modal.vue'

type componentNameType = 'confirmModal' | 'inputModal'

export const useModal = () => {
  const openModal = ({ component, myProps }: { component: componentNameType, myProps: any }) => {
    const container = document.createElement('div')
    const _closeModal = function () {
      container.parentNode!.removeChild(container)
    };
    const localProp = Object.assign({}, {
      isShow: true,
      component,
      myProps,
      close: _closeModal
    })

    const vnode = createApp(Modal, localProp)
    document.body.appendChild(container)
    vnode.mount(container)
  }
  return {
    openModal
  }

}
