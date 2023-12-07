<template>
  <aside :class="{ 'side-panel_open': isOpen }" class="side-panel">
    <div v-if="isShowLeft" class="side-panel__left">
      <slot name="left" />
    </div>
    <div class="side-panel__right">
      <slot name="right" />
    </div>
  </aside>
</template>

<script>
export default {
  name: 'UISidePanelDouble',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    isShowLeft: {
      type: Boolean,
      required: true,
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
  //max-width: 1600px;
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: 100%;
  grid-auto-flow: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  margin-right: -100%;
  overflow: auto;
  overscroll-behavior-y: none;
  background: transparent;
  transition: margin-right 0.5s;
  will-change: margin-right;

  @include mq($bp-medium) {
    width: 480px;
    margin-right: -480px;
  }

  @include mq($bp-medium) {
    grid-template-columns: minmax(min-content, 500px) 480px;
    grid-gap: 20px;
    width: 100%;
    margin-right: -100%;
  }

  @include mq($bp-medium-big) {
    grid-template-columns: minmax(min-content, 700px) 480px;
  }

  @include mq($bp-big) {
    grid-template-columns: minmax(min-content, 1000px) 480px;
  }

  &_open {
    margin-right: 0 !important;
  }

  &__left {
    grid-area: left;
    background: white;
  }

  &__right {
    display: none;
    grid-area: right;
    background: white;

    @include mq($bp-medium) {
      display: block;
    }
  }
}
</style>
