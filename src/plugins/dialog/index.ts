import { createApp, reactive, toRefs, h, provide, readonly } from 'vue'
import { CLOSE_DIALOG } from './provideInject'
import Modal from './modal.vue'
import {Props as confimDialogProps} from './propsInterface/confirmDialogProps'
import {Props as inputDialogProps} from './propsInterface/inputDialogProps'

// component and prop define
type ComponentAndProps = {
  component: 'confirmDialog',
  Props: confimDialogProps
} | {
  component: 'inputDialog',
  Props: inputDialogProps
} | {
  component: 'alertDialog',
  Props: {}
}

type SingleComponentAndProps<T extends ComponentAndProps, K> = T extends { component: K } ?  T : never
// type test = SingleComponentAndProps<ComponentAndProps, 'confirmDialog'>


type ExtractEmptyProps<A extends ComponentAndProps> = A extends any
  ? {} extends A['Props']
    ? A
    : never
  : never

// 把沒有 props 的挑出來
type ComponentWithoutProps = ExtractEmptyProps<ComponentAndProps>
// 利用 exclude 就可以把有props的抓出來
type ComponentWithProps = Exclude<ComponentAndProps, ComponentWithoutProps>


export const useDialog = () => {

  // 如果 component 沒有 props 這樣就可以 openDialog('component')
  // 後面就不用帶成這樣 openDialog('component', {})
  function openDialog<T extends ComponentWithoutProps['component']>(component: T): void

  // component 是有定義props 的話是走這個
  function openDialog<T extends ComponentWithProps['component']>(
    component: T,
    myProps: SingleComponentAndProps<ComponentAndProps, T>['Props']
  ): void
  // 利用 typescript function overload 去實作
  function openDialog( component: any, myProps?: any){
    const container = document.createElement('div')

    const data = reactive({
      isShow: true,
      component,
      myProps,
    })

    const closeDialog = function () {
      data.isShow = false
      setTimeout(() => {
        container.parentNode!.removeChild(container)
      }, 1000)
    }

    const mockDialog = {
      name: 'mockDialog',
      setup () {
        provide(CLOSE_DIALOG, closeDialog)
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

    const vnode = createApp(mockDialog)
    document.body.appendChild(container)
    vnode.mount(container)
  }
  return {
    openDialog
  }

}
