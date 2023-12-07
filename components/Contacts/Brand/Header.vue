<template>
  <header class="brand-header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.brand-header {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 15px;
  align-items: center;
  width: fit-content;
  margin-bottom: 30px;

  @include mq($bp-super-small) {
    margin-bottom: 40px;
  }

  @include mq($bp-medium-big) {
    height: 62px;
    margin-bottom: 50px;
  }
}
</style>
