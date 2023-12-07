<template>
  <div class="fast-filters">
    <nuxt-link
      v-for="(item, index) in list"
      :key="index"
      :to="item.url"
      class="fast-filters__item"
    >
      {{ item.name }}
    </nuxt-link>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.fast-filters {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  min-height: 83px;
  padding-top: 15px;

  @include mq($bp-small-medium) {
    min-height: 40px;
    padding-top: 20px;
  }

  @include mq($bp-big) {
    min-height: auto;
    padding-top: 0;
    margin-right: 20px;
  }

  &__item {
    @include label_small;

    height: fit-content;
    color: white;
    white-space: nowrap;

    @include mq($bp-small-medium) {
      @include label;
    }
  }
}

</style>
