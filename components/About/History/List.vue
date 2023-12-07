<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'AboutHistoryList',
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-gap: 30px;
  height: fit-content;

  @include mq($bp-small-medium) {
    grid-gap: 40px;
  }

  @include mq($bp-small) {
    max-width: 569px;
  }

  @include mq($bp-medium) {
    max-width: 700px;
  }

  @include mq($bp-medium-big) {
    max-width: 800px;
  }
}
</style>
