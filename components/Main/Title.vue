<template>
  <component :is="tag" class="title">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'MainTitle',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'p',
    },
  },
}
</script>

<style scoped lang="scss">
.title {
  @include h5;

  margin-bottom: 30px;

  @include mq($bp-small-medium) {
    @include h4;

    margin-bottom: 40px;
  }

  @include mq($bp-small) {
    @include h3;
  }

  @include mq($bp-medium-big) {
    @include h2;
  }
}
</style>
