<template>
  <transition name="modal-fade">
    <div
      v-if="isOpen"
      class="modal-backdrop"
      :class="{ 'modal-backdrop_full': isFullScreen }"
      @click="close"
    >
      <div
        class="modal"
        :class="{ 'modal_full-screen': isFullScreen }"
        @click.stop
      >
        <header v-if="$slots.header" class="modal__header">
          <slot name="header" />
          <IconClose class="modal__close" @click="close" />
        </header>

        <section v-if="$slots.body" class="modal__body">
          <slot name="body" />
        </section>

        <footer v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </footer>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>

defineProps({
  isFullScreen: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['close'])
const isOpen = ref(false)
const close = () => {
  isOpen.value = false
  emits('close')
}
const open = () => {
  isOpen.value = true
}
const handlerClose = (e) => {
  if (e.key === 'Escape') {
    close()
  }
}
onMounted(() => {
  document.addEventListener('keyup', handlerClose)
})
onBeforeUnmount(() => {
  document.removeEventListener('keyup', handlerClose)
})

defineExpose({
  open,
  close,
  handlerClose,
})
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 14%);

  &_full {
    z-index: 100;
  }
}

.modal {
  z-index: 1;
  display: grid;
  grid-template-rows: min-content min-content min-content;
  grid-gap: 40px;
  width: 100%;
  height: 100%;
  padding: 30px 15px;
  overflow-x: auto;
  background: white;

  @include mq($bp-small) {
    grid-template-rows: min-content 1fr min-content;
    width: auto;
    min-width: 450px;
    height: auto;
    min-height: 450px;
    padding: 35px;
  }

  &_full-screen {
    grid-template-rows: auto;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 100px 0;

    @include mq($bp-medium) {
      padding: 50px;
    }
  }

  &__header {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
  }

  &__body {
    position: relative;
  }

  &__footer {
    flex-direction: column;
  }

  &__close {
    align-self: flex-start;
    justify-self: flex-end;
    width: 35px;
    height: 35px;
    padding: 5.5px;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
