<template>
  <div
    :class="{ overlay_avtodom: isAvtodom,
              overlay_asc: isAsc,
              overlay__navBar_open: isOpen && isNavBar,
              overlay_open: isOpen, }"
    class="overlay"
    v-bind="$attrs"
  />
  <slot />
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'

export default {
  name: 'UIBaseOverlay',
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: null,
    },
    isNavBar: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup () {
    const { $controlFixBody } = useNuxtApp()
    const beforeUnmountCallback = () => {
      $controlFixBody(false)
    }
    onBeforeUnmount(beforeUnmountCallback)
  },
  computed: {
    ...mapState(useHoldingStore, ['isAvtodom', 'isAsc']),
  },
  watch: {
    isOpen (isOpen) {
      const { $controlFixBody } = useNuxtApp()
      isOpen ? $controlFixBody(true) : $controlFixBody(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: -100px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: calc(100% + 200px);
  min-height: 100vh;
  pointer-events: none;
  visibility: hidden;
  background: rgb(0 0 0 / 14%);
  opacity: 0;
  transition: opacity 0.2s ease;

  &__navBar_open {
    top: 65px;
    z-index: 2;

    &.overlay {
      &_avtodom {
        top: 86px;

        @include mq($bp-medium) {
          top: 99px;
        }
      }

      &_asc {
        top: 97px;
      }
    }
  }

  &_open {
    pointer-events: all;
    visibility: visible;
    opacity: 1;
  }
}
</style>
