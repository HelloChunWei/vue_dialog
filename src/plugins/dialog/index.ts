import Vue, { reactive, toRefs, h, provide, DefineComponent } from 'vue'
import type { ComponentOptionsMixin } from 'vue/types/v3-component-options'
import type { ExtractPropTypes } from 'vue/types/v3-component-props'
import { CLOSE_DIALOG } from './provideInject'
import Modal from './Modal.vue'

type ComponentWithProps<PropsOrPropOptions, Props> = DefineComponent<PropsOrPropOptions, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, Props>
type ComponentWithoutProps = DefineComponent<{}, unknown, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, Readonly<ExtractPropTypes<{}>>, {}>


export const useDialog = () => {

  // 如果 component 沒有 props 這樣就可以 openDialog(component)
  // 後面就不用帶成這樣 openDialog(component, {})
  function openDialog<PropsOrPropOptions, Props>(component: ComponentWithoutProps): void

  // component 是有定義props 的話是走這個
  function openDialog<PropsOrPropOptions, Props>(component: ComponentWithProps<PropsOrPropOptions, Props>, props: (Props) | ({} extends Props ? null : never)): void;

  // 利用 typescript function overload 去實作
  function openDialog( component: any, props?: any){
    const container = document.createElement('div')

    const data = reactive({
      isShow: true,
      props,
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
          props: {
            isShow: data.isShow,
            component,
            myProps: data.props,
          }
        })
      }
    }

    const vnode = new Vue(mockDialog)
    document.body.appendChild(container)
    vnode.$mount(container)
  }
  return {
    openDialog
  }

}
