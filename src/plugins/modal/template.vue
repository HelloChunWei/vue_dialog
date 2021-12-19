<template>
  <div class="modal-mask">
    <div ref="modalMask" class="modal-wrapper" @click="closeOutside">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
          </slot>
        </div>
        <div class="modal-body" style="padding: 24px">
          <slot name="body">
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer" :close="close">
            <button @click="$emit('close')">
              取消
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unrefElement } from '@vueuse/core'
import { CLOSE_MODAL, injectStrict } from './provideInject'
export default defineComponent({
  setup() {
    const modalMask = ref<HTMLElement | null>(null)
    const close = injectStrict(CLOSE_MODAL)
    const closeOutside = (e: Event) => {
      if (unrefElement(modalMask) === e.target) {
        close()
      }
    }
    return {
      close,
      modalMask,
      closeOutside
    }
  },
})
</script>
<style scoped>
.modal-mask {
  overflow: scroll;
  position: fixed;
  z-index: 999;
  padding-bottom: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.modal-header {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
}
.modal-header h3 {
  margin-top: 0;
  color: #313634;
}
.modal-container {
  max-height: 100%;
  max-width: 400px;
  width: 95%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  margin: 0px 0;
  overflow-y:auto;
}

.modal-footer{
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: .3rem;
  border-bottom-left-radius: .3rem;
}
.font-set{
  font-size: 20px;
}
</style>

