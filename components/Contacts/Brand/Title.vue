<template>
  <h2 class="brand-title">
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
.brand-title {
  @include h3;

  @include mq($bp-medium-big) {
    @include h2;
  }
}
</style>
