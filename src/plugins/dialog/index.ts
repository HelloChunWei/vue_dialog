import {
  ComponentOptions,
  VNodeProps,
  createApp,
  reactive,
  toRefs,
  h,
  provide,
  DefineComponent,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  EmitsOptions,
} from 'vue'
import Modal from './Modal.vue'
import { CLOSE_DIALOG } from './provideInject'


type TransformConstructor<T> = {
  [K in keyof T]: T[K] extends { type: StringConstructor } ? { type: string } & Omit<T[K], 'type'> : 
  T[K] extends { type: NumberConstructor } ? { type: number } & Omit<T[K], 'type'> : 
  T[K] extends { type: BooleanConstructor } ? { type: boolean } & Omit<T[K], 'type'> : never;
}


type getRequriredProps<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}
type isNotRequired<T> = {
  [K in keyof T]: T[K] extends { required: true } ? never :  K
}

type TransformProps<Props> = {
  [k in getRequriredProps<TransformConstructor<Props>>[keyof getRequriredProps<TransformConstructor<Props>>]]: TransformConstructor<Props>[k]['type']
} & {
  [k in isNotRequired<TransformConstructor<Props>>[keyof isNotRequired<TransformConstructor<Props>>]]?: TransformConstructor<Props>[k]['type']
}

export const useDialog = () => {

  // 如果 component 沒有 props 這樣就可以 openDialog(component)
  // 後面就不用帶成這樣 openDialog(component, {})
  function openDialog<
    A,
    B,
    C extends ComputedOptions,
    D extends MethodOptions,
    E extends ComponentOptionsMixin,
    F extends ComponentOptionsMixin,
    G extends EmitsOptions,
    H extends string
  >(component: DefineComponent<
    {},
    A,
    B,
    C,
    E
  >): void

  // component 是有定義props 的話是走這個
  function openDialog<
    P,
    A,
    B,
    C extends ComputedOptions,
    D extends MethodOptions,
    E extends ComponentOptionsMixin,
    F extends ComponentOptionsMixin,
    G extends EmitsOptions,
    H extends string
  >(component: DefineComponent<
    P,
    A,
    B,
    C,
    E
    >, props: TransformProps<P>): void;

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
