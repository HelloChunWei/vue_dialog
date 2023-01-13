import Vue, { reactive, toRefs, h, provide, DefineComponent } from 'vue'
import type { ComponentOptionsMixin } from 'vue/types/v3-component-options'
import type { ExtractPropTypes } from 'vue/types/v3-component-props'
import { CLOSE_DIALOG } from './provideInject'
import Modal from './Modal.vue'

type ComponentWithProps<PropsOrPropOptions, Props> = DefineComponent<
  PropsOrPropOptions,
  unknown,
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  Props,
  {}
> | DefineComponent<
  Readonly<{ [key in string]?: any }>,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  Props,
  {}>

type ComponentWithoutProps = DefineComponent<
  {},
  unknown,
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  Readonly<ExtractPropTypes<{}>>,
  {}>


type Option = {
  color: string
}
export const useDialog = () => {

  function openDialog(
    component: ComponentWithProps<{}, {}>, // eslint-disable-line
    option?: Option
  ): void

  function openDialog<PropsOrPropOptions, Props>(
    ...args: Props extends Record<string, never> ?
      never :
      [component: ComponentWithProps<PropsOrPropOptions, Props>, props: Props, option?: Option]
  ): void;

  // 利用 typescript function overload 去實作
  function openDialog(component: any, props?: any) {
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
      setup() {
        provide(CLOSE_DIALOG, closeDialog)
        return {
          ...toRefs(data)
        }
      },
      render() {
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