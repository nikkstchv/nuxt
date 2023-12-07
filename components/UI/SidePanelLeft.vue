<template>
  <aside :class="{ 'side-panel_open': isOpen }" class="side-panel">
    <slot />
  </aside>
</template>

<script>
export default {
  name: 'SidePanelLeft',
  props: {
    isOpen: {
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
  right: auto;
  bottom: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px 30px 100px 39px;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  transition: transform 0.5s 0s;
  transform: translateX(-480px);

  @include mq(360px) {
    padding: 18.5px 52px 100px 54px;
  }

  @include mq(479px) {
    width: 480px;
  }

  @include mq($bp-small-medium) {
    padding: 34px 61px 100px 59px;
  }

  @include mq($bp-small) {
    padding: 34px 59px 100px 71px;
  }

  @include mq($bp-medium) {
    padding: 33px 85px 100px 95px;
  }

  @include mq($bp-medium-big) {
    padding: 58px 89px 100px;
  }

  @include mq($bp-big) {
    padding: 58px 62px 100px 146px;
  }

  &_open {
    transform: translateX(0);
  }
}
</style>
