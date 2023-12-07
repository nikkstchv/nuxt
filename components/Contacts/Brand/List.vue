<template>
  <ul class="brand-list">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.brand-list {
  display: grid;
  grid-gap: 70px;
  height: fit-content;

  @include mq($bp-big) {
    grid-gap: 100px;
  }
}
</style>
