import { createApp, reactive, toRefs, h, provide, readonly } from 'vue'
import { CLOSE_MODAL } from './provideInject'
import Modal from './modal.vue'
import {Props as confimModalProps} from './propsInterface/confirmModalProps'
import {Props as inputModalProps} from './propsInterface/inputModalProps'

// component and prop define
type ComponentAndProps = {
  component: 'confirmModal',
  Props: confimModalProps
} | {
  component: 'inputModal',
  Props: inputModalProps
} | {
  component: 'alertModal',
  Props: {}
}


type Props<T extends ComponentAndProps, K> = T extends { component: K } ?  T['Props'] : never



type ExtractSimpleAction<A extends ComponentAndProps> = A extends any
  ? {} extends A['Props']
    ? A
    : never
  : never

// 把沒有 props 的挑出來
type SimpleType = ExtractSimpleAction<ComponentAndProps>
// 利用 exclude 就可以把有props的抓出來
type ComplexActionType = Exclude<ComponentAndProps, SimpleType>


export const useModal = () => {
  // use function overload

  // 如果 component 沒有 props 這樣就可以 dispatch('component')
  // 後面就不用帶成這樣 dispatch('component', {})
  function dispatch<T extends SimpleType['component']>(component: T): void
  // component 是有定義props 的話是走這個
  function dispatch<T extends ComplexActionType['component']>(
    component: T,
    myProps: Props<ComponentAndProps, T>
  ): void
  // 利用 typescript function overload 去實作
  function dispatch( component: any, myProps?: any){
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
    openModal: dispatch
  }

}
