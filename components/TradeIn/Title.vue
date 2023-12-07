<template>
  <h2 class="trade-in-title">
    <slot />
  </h2>
</template>

<script>
export default {
  name: 'TradeInTitle',
}
</script>

<style scoped lang="scss">
.trade-in-title {
  @include h4;

  text-align: center;

  @include mq($bp-small-medium) {
    @include h3;
  }

  @include mq($bp-medium) {
    @include h2;
  }

  @include mq($bp-medium-big) {
    @include h1;
  }
}
</style>
