<template>
  <transition name="popup-fade">
    <div v-if="isOpen" class="popup-backdrop">
      <div
        v-if="isOpen"
        :class="['popup', { popup_sticky: !isSticky }]"
        @click.stop
      >
        <IconClose
          class="popup__close"
          @click="close();agreeRemove()"
        />
        <section v-if="$slots.body" class="popup__body">
          <slot name="body" />
        </section>
        <footer v-if="$slots.footer" class="popup__footer">
          <slot name="footer" />
        </footer>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UIPopup',
  props: {
    agreeRemove: {
      type: Function,
      require: false,
      default: () => {},
    },
  },
  data: () => ({
    isOpen: false,
    isSticky: false,
    lastScrollTop: 0,
  }),
  watch: {
    isOpen (open) {
      if (open) {
        setTimeout(() => {
          this.close()
          this.agreeRemove()
        }, 5000)
      }
    },
  },
  methods: {
    onSticky () {
      this.isSticky = window.scrollY <= this.lastScrollTop
      this.lastScrollTop = window.scrollY
    },

    close () {
      document.removeEventListener('keyup', this.handlerClose)
      document.removeEventListener('scroll', this.onSticky)

      this.isOpen = false
    },

    open () {
      this.onSticky()

      document.addEventListener('keyup', this.handlerClose)
      document.addEventListener('scroll', this.onSticky)

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
.popup-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  pointer-events: none;

  @include mq($bp-medium-big) {
    justify-content: flex-end;
  }
}

.popup {
  position: absolute;
  top: 61px;
  display: grid;
  grid-template-rows: min-content min-content min-content;
  width: 100%;
  max-width: 285px;
  padding: 25px 20px 20px;
  overflow-x: auto;
  color: white;
  pointer-events: all;
  background-color: var(--blackLight);
  border-radius: 4px;
  transition: top 0.3s ease;

  @include mq($bp-medium) {
    right: 50px;
    padding: 30px;
  }

  @include mq($bp-medium-big) {
    top: 105px;
    right: 40px;
  }

  @include mq($bp-big) {
    top: 116px;
    right: 146px;
  }

  &_sticky {
    @include mq($bp-medium-big) {
      top: 75px;
    }

    @include mq($bp-big) {
      top: 86px;
    }
  }

  &__body {
    position: relative;
  }

  &__footer {
    flex-direction: column;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    justify-self: flex-end;
    width: 24px;
    height: 24px;

    & :deep(.icon) {
      width: auto;
      height: auto;
    }

    & :deep(.icon__path) {
      stroke: white;
    }
  }
}

.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>
