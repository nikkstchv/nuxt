<template>
  <p class="text">
    <slot />
  </p>
</template>

<script>
export default {
  name: 'DetailText',
}
</script>

<style lang="scss" scoped>
.text {
  @include text_big_regular;

  margin-bottom: 40px;
}
</style>
