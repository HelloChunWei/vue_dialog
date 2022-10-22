import { InjectionKey, inject } from 'vue';
export const CLOSE_DIALOG: InjectionKey<() => void> = Symbol('closeDialog')
export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T)  => {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key}`)
  }
  return resolved;
}

