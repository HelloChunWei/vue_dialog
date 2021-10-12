import { createVNode, render } from 'vue'
import Modal from './modal.vue'

export default function ({ componentName = '', myProps }: { componentName: string, myProps: any }) {
  const container = document.createElement('div')

  const myPropss = Object.assign({}, {
    isShow: true,
    componentName,
    myProps,
  })

  const vnode = createVNode(Modal, myPropss)
  render(vnode, container)
  // @ts-ignore
  const { props } = vnode.component
  // 有點 tricky 的地方，只能call by reference 傳進去
  const _closeModal = function () {
    props.isShow = false
    container.parentNode!.removeChild(container)
  };
  Object.assign(props, {
    close: _closeModal
  })
  document.body.appendChild(container)
  
}
