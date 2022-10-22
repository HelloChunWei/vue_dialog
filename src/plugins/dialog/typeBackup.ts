
// component and prop define
type ComponentAndProps = {
  component: 'confirmDialog',
  Props: {
    user_id: string
  }
} | {
  component: 'inputDialog',
  Props: {
    product: number
  }
} | {
  component: 'alertDialog',
  Props: {}
}
type Props<T extends ComponentAndProps, K> = T extends { component: K } ? T : never



type ExtractSimpleAction<A extends ComponentAndProps> = A extends any
  ? {} extends A['Props']
  ? A
  : never
  : never

// 把沒有 props 的挑出來
type SimpleType = ExtractSimpleAction<ComponentAndProps>
// 利用 exclude 就可以把有props的抓出來
type ComplexActionType = Exclude<ComponentAndProps, SimpleType>


export function dispatch<T extends SimpleType['component']>(component: T): void

// component 是有定義props 的話是走這個
export function dispatch<T extends ComplexActionType['component']>(
    component: T,
    myProps: Props<ComponentAndProps, T>['Props']
  ): void

export function dispatch(component: any, myProps?: any){}

dispatch('alertDialog')
dispatch('confirmDialog', {
  user_id: 's'
})