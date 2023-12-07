<template>
  <aside
    :class="[
      'side-panel',
      {
        'side-panel_open': isOpen,
        'side-panel_full-width': fullWidth,
        'side-panel_no-bg': noBg,
      },
    ]"
    @click.self="$emit('click')"
  >
    <slot />
  </aside>
</template>

<script>
export default {
  name: 'UISidePanel',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    noBg: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.side-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  margin-right: -100%;
  overflow: auto;
  overscroll-behavior-y: none;
  background: white;
  transition: margin-right 0.5s;
  will-change: margin-right;

  @include mq($bp-small) {
    width: 520px;
  }

  &_open {
    margin-right: 0 !important;
  }

  &_full-width {
    @include mq($bp-small) {
      width: 100%;
    }
  }

  &_no-bg {
    background: none;
  }
}
</style>
