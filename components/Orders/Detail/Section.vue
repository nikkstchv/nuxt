<template>
  <section
    class="section"
    :class="{
      'section_main-info': mainInfo,
    }"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'OrdersDetailSection',
  props: {
    mainInfo: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-gap: 40px;
  margin-bottom: 50px;

  @include mq($bp-small-medium) {
    grid-gap: 20px;
  }

  @include mq($bp-small) {
    margin-bottom: 100px;
  }

  &_main-info {
    grid-gap: 10px;
    max-width: 560px;
    padding: 15px 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: var(--grayLight);

    @include mq($bp-super-small) {
      padding: 20px;
    }

    @include mq($bp-small) {
      padding: 40px;
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
}
</style>
