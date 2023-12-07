<template>
  <li class="brand-item">
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.brand-item {
  position: relative;
  max-width: 1100px;

  @include mq($bp-medium-big) {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-auto-flow: column;
    grid-gap: 30px;
  }
}
</style>
