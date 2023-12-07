<template>
  <li class="item">
    <h2 class="item__title" :class="{ item__title_with_dot: isNew }">
      {{ title }}
    </h2>
    <p class="item__text">
      {{ text }}
    </p>
    <span class="item__date">{{ date }}</span>
  </li>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  text: {
    type: String,
    required: true,
    default: '',
  },
  date: {
    type: String,
    required: true,
    default: '',
  },
  isNew: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.item {
  @include text_medium_regular;

  position: relative;
  display: grid;
  grid-gap: 15px;
  width: 100%;
  padding-bottom: 20px;
  padding-left: 11px;
  border-bottom: 1px solid var(--grayMediumLight);

  &__title {
    @include label;

    &_with_dot::before {
      position: absolute;
      top: 9px;
      left: 0;
      width: 6px;
      height: 6px;
      content: '';
      background-color: var(--error);
      border-radius: 50%;
    }
  }

  &__text {
    @include text_medium_regular;
  }

  &__date {
    @include text_small_medium;

    color: var(--grayDark);
  }
}
</style>
