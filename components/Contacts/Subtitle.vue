<template>
  <h2 class="subtitle">
    <slot />
  </h2>
</template>

<script>
export default {
  name: 'ContactsSubtitle',
}
</script>

<style lang="scss" scoped>
.subtitle {
  @include h5;

  align-self: center;
  margin-bottom: 15px;

  @include mq($bp-small-medium, $bp-medium-big) {
    @include h3;
  }

  @include mq($bp-small-medium, $bp-medium) {
    margin-bottom: 20px;
  }

  @include mq($bp-medium) {
    margin-bottom: 30px;
  }

  @include mq($bp-medium-big) {
    @include h2;
  }
}
</style>
