<template>
  <ul
    class="list"
    :class="{
      list_header: header,
    }"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'OrdersDetailList',
  props: {
    header: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-gap: 8px;

  @include mq($bp-small-medium) {
    grid-template-columns: 50% 1fr max-content;
    grid-auto-flow: column;
    grid-gap: 50px;
  }

  @include mq($bp-small) {
    grid-gap: 75px;
  }

  @include mq($bp-big) {
    grid-template-columns: 60% 1fr max-content;
  }

  &_header {
    display: none;
    padding-bottom: 15px;
    margin-bottom: 25px;

    @include mq($bp-small-medium) {
      display: grid;
      border-bottom: 1px solid var(--grayMediumLight);
    }
  }
}
</style>
