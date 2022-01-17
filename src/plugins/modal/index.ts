import { createApp, reactive, toRefs, h, provide, readonly } from 'vue'
import { CLOSE_MODAL } from './provideInject'
import Modal from './modal.vue'
import {Props as confimModalProps} from './propsInterface/confirmModalProps'
import {Props as inputModalProps} from './propsInterface/inputModalProps'

type ComponentAndProps = {
  component: 'confirmModal',
  Props: confimModalProps
} | {
  component: 'inputModal',
  Props: inputModalProps
}

type Components = ComponentAndProps['component']

type Props<T extends ComponentAndProps, K> = T extends { component: K } ?  T['Props'] : never



export const useModal = () => {
  const openModal = function <T extends Components>(
    component: T,
    myProps: Props<ComponentAndProps, T>
    ){
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
        provide(CLOSE_MODAL, data.close)
        return {
          ...toRefs(data)
        }
      },
      render () {
        return h(Modal, {
          isShow: data.isShow,
          component: data.component,
          myProps: data.myProps,
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
