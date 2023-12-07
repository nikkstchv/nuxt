<template>
  <component :is="tag" class="title">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'DetailTitle',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'h2',
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  @include h3;

  margin-bottom: 30px;

  @include mq($bp-medium-big) {
    @include h2;
  }
}
</style>
