import { ComponentOptions, VNodeProps, createApp, reactive, toRefs, h, provide } from 'vue'
import { CLOSE_DIALOG } from './provideInject'
import Modal from './Modal.vue'

export const useDialog = () => {

  // 如果 component 沒有 props 這樣就可以 openDialog(component)
  // 後面就不用帶成這樣 openDialog(component, {})
  function openDialog(component: ComponentOptions<{}>): void

  // component 是有定義props 的話是走這個
  function openDialog<P>(component: ComponentOptions<P>, props: P): void;

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
          isShow: data.isShow,
          component,
          myProps: data.props,
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
