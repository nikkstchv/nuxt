<template>
  <div class="mobile-panel-wrapper">
    <transition name="mobile-panel-backdrop-fade">
      <div v-if="isOpen" class="mobile-panel-backdrop" @click="close" />
    </transition>
    <transition name="mobile-panel-translateY">
      <div v-if="isOpen" class="mobile-panel" @click.stop>
        <IconClose class="mobile-panel__close" @click="close" />
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MobileBottomPanel',
  // props: {
  //   open: {
  //     type: Boolean,
  //     required: false,
  //     default: false,
  //   },
  // },
  // data: () => ({
  //   isInit: false,
  // }),
  // mounted() {
  //   this.isInit = true
  // },
  // methods: {
  //   onClose() {
  //     if (this.isInit) {
  //       this.$emit('onCloseMobilePanel')
  //     }
  //   },
  // },
  data: () => ({
    isOpen: false,
  }),
  mounted () {
    document.addEventListener('keyup', this.handlerClose)
  },
  beforeUnmount () {
    document.removeEventListener('keyup', this.handlerClose)
  },
  methods: {
    close () {
      this.isOpen = false
    },
    open () {
      this.isOpen = true
    },
    handlerClose (e) {
      if (e.key === 'Escape') {
        this.close()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mobile-panel-backdrop {
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
}

.mobile-panel-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
}

.mobile-panel {
  position: fixed;
  //bottom: -100%;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  min-height: 400px;
  max-height: 450px;
  padding: 20px 15px;
  background-color: white;
  box-shadow: 0 -6px 20px rgb(13 10 25 / 10%);
  transition: all 0.3s;
  transform: translateY(0);

  &_open {
    bottom: 0;
  }

  &__close {
    align-self: flex-end;
    width: 24px;
    height: 24px;
    margin-bottom: 20px;
  }
}

.mobile-panel-backdrop-fade-enter,
.mobile-panel-backdrop-fade-leave-to {
  opacity: 0;
}

.mobile-panel-backdrop-fade-enter-active,
.mobile-panel-backdrop-fade-leave-active {
  transition: opacity 0.2s ease;
}

.mobile-panel-translateY-enter,
.mobile-panel-translateY-leave-to {
  transform: translateY(0);
}

.mobile-panel-translateY-enter-active,
.mobile-panel-translateY-leave-active {
  transition: all 0.2s;
  transform: translateY(100%);
}
</style>
