import { InjectionKey, inject } from 'vue';
export const CLOSE_MODAL: InjectionKey<() => void> = Symbol('closeModal')
export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T)  => {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key}`)
  }
  return resolved;
}

