import { createApp, reactive, toRefs, h } from 'vue'
import Modal from './modal.vue'

type componentNameType = 'confirmModal' | 'inputModal'

export const useModal = () => {
  const openModal = ({ component, myProps }: { component: componentNameType, myProps: any }) => {
    const container = document.createElement('div')
    const _closeModal = function () {
      data.isShow = false
      container.parentNode!.removeChild(container)
    }

    const data = reactive({
      isShow: true,
      component,
      myProps,
      close: _closeModal
    })

    const mockModal = {
      name: 'mockModal',
      setup () {
        return {
          ...toRefs(data)
        }
      },
      render () {
        return h(Modal, {
          isShow: data.isShow,
          component: data.component,
          myProps: data.myProps,
          close: data.close
        })
      }
    }

    const vnode = createApp(mockModal)
    document.body.appendChild(container)
    vnode.mount(container)
  }
  return {
    openModal
  }

}
